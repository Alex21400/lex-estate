import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { updateUserSuccess, updateUserStart, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const UserProfile = () => {
  const { currentUser } = useSelector(state => state.user);
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({});

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
        console.log(data);
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
    <div className='p-3 max-w-lg mx-auto bg-slate-50'>
        <h1 className='text-3xl font-semibold text-center my-7'>User Profile</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="file" id='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
            <img 
                src={formData.photo ?? currentUser.photo} 
                alt="profile.png" 
                className='rounded-full w-28 h-28 object-cover cursor-pointer my-4 self-center'
                onClick={() => fileRef.current.click()} />
            {uploadError ? <span className='text-red-700 text-sm text-center'>An error occured while uploading the image</span> 
            : percentages > 0 && percentages < 100 ? 
            <span className='text-gray-500 text-center'>{`Uploading ${percentages}%`} </span> 
            : percentages === 100 ? <span className='text-green-600 text-center'>Image uploaded successfuly</span> : ''}
            <input type="text" id='username' className='border p-3 rounded-lg' defaultValue={currentUser.username} onChange={(e) => handleChange(e)}/>
            <input type="text" defaultValue={currentUser.email} placeholder='Email' id='email' className='border p-3 rounded-lg' disabled />
            <input type="password" name='password' id='password' className='border p-3 rounded-lg' onChange={(e) => handleChange(e)}/>
            <button type='submit' className='bg-slate-600 p-3 rounded-lg text-white font-semibold hover:opacity-90 disabled:opacity-80'>Update</button>
            <Link to={'/create-listing'} className='bg-transarept border-2 border-slate-600 p-3 rounded-lg text-slate-600 font-semibold hover:opacity-90 text-center'>Create a Listing</Link>
        </form>

        <div className='flex justify-between my-3'>
            <span className='cursor-pointer text-slate-900 font-medium' onClick={handleDeleteUser}>Delete Account</span>
            <span className='cursor-pointer text-slate-900 font-medium' onClick={handleSignout}>Sign Out</span>
        </div>
    </div>
  )
}

export default UserProfile