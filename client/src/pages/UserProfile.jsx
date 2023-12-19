import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { updateUserSuccess, updateUserStart, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { IoMdInformationCircleOutline } from "react-icons/io";

const UserProfile = () => {
  const { currentUser } = useSelector(state => state.user);
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const [file, setFile] = useState(null);
  const [percentages, setPercentages] = useState(null);
  const [uploadError, setUploadError] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  }

  useEffect(() => {
    file && handleUpload(file);
  }, [file]);

  const handleUpload = (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercentages(Math.round(progress));
    },
    (error) => {
      setUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, photo: downloadURL });
      })
    });
  }
  
  // Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch('/api/users/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if(res.ok) {
        dispatch(updateUserSuccess(data));
        console.log(data);
      } else {
        dispatch(updateUserFailure(data.message));
      }
    } catch(error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  //logout user
  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');

      const data = await res.json();

      if(res.ok) {
        dispatch(signOutUserSuccess());
      }
    } catch(error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  // delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch('/api/users/delete', {
        method: 'DELETE'
      });

      const data = await res.json();
      
      if(res.ok) {
        dispatch(deleteUserSuccess());
        console.log(data);
      } else {
        dispatch(deleteUserFailure(data.message));
      }
    } catch(error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div className='lg:mt-32 mt-28 px-6 xl:px-0'>
      <div className='p-6 mt-12 max-w-xl mx-auto bg-black-200 rounded-lg'>
        <h1 className='text-3xl font-semibold text-center my-7'>User Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='relative flex flex-col mb-4'>
              <input type="file" id='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
              <img
                  src={formData.photo ?? currentUser.photo} 
                  alt="profile.png" 
                  className='rounded-full w-32 h-32 object-cover cursor-pointer my-4 self-center'
                  onClick={() => fileRef.current.click()} 
                  onMouseEnter={() => setIsVisible(true)}
                  onMouseLeave={() => setIsVisible(false)} />
              {isVisible && (
                <p className='absolute bottom-[-10px] left-[50%] transform translate-x-[-50%] text-center flex items-center gap-1 whitespace-nowrap'>
                  <IoMdInformationCircleOutline size={20}/>
                  Click on the image to upload a new one
                </p>
              )}    
              {uploadError ? <span className='text-red-700 text-sm text-center'>An error occured while uploading the image</span> 
              : percentages > 0 && percentages < 100 ? 
              <span className='text-secondary text-center'>{`Uploading ${percentages}%`} </span> 
              : percentages === 100 ? <span className='text-green-600 text-center'>Image uploaded successfuly</span> : ''}
            </div>
            <input type="text" id='username' className='border p-3 rounded-lg bg-slate-50 text-black-100' defaultValue={currentUser.username} onChange={(e) => handleChange(e)}/>
            <input type="text" defaultValue={currentUser.email} placeholder='Email' id='email' className='border p-3 rounded-lg bg-slate-50 text-black-100' disabled />
            <input type="password" name='password' id='password' className='border p-3 rounded-lg bg-slate-50 text-black-100 placeholder:text-black-200' placeholder='Password' onChange={(e) => handleChange(e)}/>
            <button type='submit' className='bg-primary p-3 rounded-lg text-white font-semibold hover:opacity-90 disabled:opacity-80'>Update</button>
            <Link to={'/create-listing'} className='bg-transarept border-2 border-primary p-3 rounded-lg text-primary font-semibold hover:opacity-90 text-center'>Create a Listing</Link>
            <Link to={`/user-profile/userListings`} className='text-blue-500 text-lg text-center mb-4 hover:underline'>
              Your Listings
            </Link>
        </form>

        <div className='flex justify-between my-3'>
            <span className='cursor-pointer text-white-100 font-medium hover:underline' onClick={handleDeleteUser}>Delete Account</span>
            <span className='cursor-pointer text-white-100 font-medium hover:underline' onClick={handleSignout}>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default UserProfile