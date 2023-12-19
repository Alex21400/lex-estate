import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable, getStorage } from 'firebase/storage';
import { app } from '../firebase';
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateListing = () => {
  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();
  const params = useParams();

  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: '',
    description: '',
    address: '',
    type: 'rent',
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0
  });

  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Load listing
  useEffect(() => {
    const fetchListing = async () => {
        const listingId = params.id;
        
        const res = await fetch(`/api/listings/${listingId}`);

        const data = await res.json();
        setFormData(data);
    }

    fetchListing();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type } = e.target;

    if(id === 'sale' || id === 'rent') {
        setFormData({ 
            ...formData, 
            type: id 
        });
    }

    if(id === 'parking' || id === 'furnished' || id === 'offer') {
        setFormData({
            ...formData,
            [id]: e.target.checked
        });
    }

    if(type === 'number' || type === 'text' || type === 'textarea') {
        setFormData({
            ...formData,
            [id]: value
        });
    }
  }

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
        if(formData.imageUrls.length < 1) {
            setFormError('Please upload at least 1 image.');
            return;
        }

        if(+formData.regularPrice < +formData.discountPrice) {
            setFormError('Discount price must be lower than regular price.');
            return;
        }

        setFormLoading(true);

        const res = await fetch(`/api/listings/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ... formData, userId: currentUser.id })
        });

        const data = await res.json();
        

        if(res.ok) {
            setFormLoading(false);
            setFormError(null);
            navigate(`/listings/${data._id}`);
        } else {
            setFormError(data.message);
        }
    } catch(error) {    
        setFormError(error.message);
    }
  }


  // Handles uploading of all images
  const handleImageUpload = async (e) => {
    setLoading(true);
    setImageUploadError(null);

    if(files.length > 0 && files.length < 7) {
        const promises = [];

        for(let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
        }

        Promise.all(promises)
            .then(urls => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });

                setImageUploadError(null);
                setLoading(false);
            })
            .catch(error => {
                setImageUploadError(error.message);
                setLoading(false);
            }) 
    } else {
        setImageUploadError('You can upload only 6 images.');
        setLoading(false);
    }
  }

  // Store image function
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
            // console.log(progress);
        },
        (error) => {
            reject(error);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                resolve(downloadURL);
            }) ;
        }
        )
    })
  }

  // Remove image function
  const handleRemoveImage = (index) => {
    setFormData({ ...formData, imageUrls: formData.imageUrls.filter((url, i) => {
        return i !== index;
    })});
  }

  return (
    <main className='p-4 max-w-4xl mx-auto'>
        <h2 className='text-3xl font-semibold text-center my-7'>Create Listing</h2>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input 
                    type="text" 
                    placeholder='Title' 
                    className='border p-3 rounded-lg bg-slate-50 text-black-200' 
                    id='title' 
                    maxLength='100' 
                    minLength='10' 
                    required  
                    onChange={handleChange} 
                    value={formData.title}/>
                <textarea 
                    type="text" 
                    placeholder='Description' 
                    id="description" 
                    rows="10" 
                    className='border p-3 rounded-lg bg-slate-50 text-black-200' 
                    required 
                    onChange={handleChange}
                    value={formData.description}/>
                <input 
                    type="text" 
                    placeholder='Address' 
                    className='border p-3 rounded-lg bg-slate-50 text-black-200' 
                    id='address' 
                    maxLength='100' 
                    minLength='10' 
                    required 
                    onChange={handleChange}
                    value={formData.address} />
            
                <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="sale" className='w-5' onChange={handleChange} checked={formData.type === 'sale'} />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="rent" className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="parking" className='w-5' onChange={handleChange} checked={formData.parking} />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="furnished" className='w-5' onChange={handleChange} checked={formData.furnished} />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="offer" className='w-5' onChange={handleChange} checked={formData.offer} />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap'>
                    <div className='flex items-center gap-2'>
                        <input 
                            className='p-3 border border-gray-300 rounded-lg bg-slate-50 text-black-200' 
                            type="number" 
                            id="bedrooms" 
                            min='1' 
                            max='12' 
                            required
                            onChange={handleChange} 
                            value={formData.bedrooms} />
                        <span>Bedrooms</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input 
                            className='p-3 border border-gray-300 rounded-lg bg-slate-50 text-black-200' 
                            type="number" 
                            id="bathrooms" 
                            min='1' 
                            max='12' 
                            required 
                            onChange={handleChange}
                            value={formData.bathrooms} />
                        <span>Bathrooms</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input 
                            className='p-3 border border-gray-300 rounded-lg w-15 bg-slate-50 text-black-200' 
                            min='10' 
                            max='10000000' 
                            type="number" 
                            id="regularPrice" 
                            required 
                            onChange={handleChange}
                            value={formData.regularPrice} />
                        <div className='flex flex-col'>
                            <p>Regular Price</p>
                            <span className='text-md text-secondary'>{formData.type === 'rent' ? '($ / Month)' : '$'}</span>
                        </div>
                    </div>
                    {formData.offer && (
                        <div className='flex items-center gap-2'>
                        <input 
                            className='p-3 border border-gray-300 rounded-lg w-15 bg-slate-50 text-black-200' 
                            min='10' 
                            max='10000000' 
                            type="number" 
                            id="discountPrice"
                            required 
                            onChange={handleChange}
                            value={formData.discountPrice}/>
                        <div className='flex flex-col'>
                            <p>Discount Price</p>
                            <span className='text-md text-gray-600'>{formData.type === 'rent' ? '($ / Month)' : '$'}</span>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold'>
                    Images: 
                    <span className='font-normal text-secondary ml-2'>The first image will be cover image (max-6)</span>
                </p>
                <div className='flex gap-4'>
                    <input type="file" className='p-2 border border-gray-300 rounded-lg w-full' accept='image/*' multiple onChange={(e) => setFiles(e.target.files)} />
                    <button type='button' disabled={loading} className='px-4 py-2 border border-secondary text-secondary rounded-lg font-medium hover:opacity-90' onClick={handleImageUpload}>{!loading ? 'Upload' : 'Uploading...'}</button>
                </div>
                <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                        return (
                            <div className='flex items-center justify-between p-3 border' key={index}>
                                <img src={url} alt='image' className='w-20 h-20 object-contain rounded-lg' />
                                <IoClose className='cursor-pointer' color='white-200' size={28} onClick={() => handleRemoveImage(index)} />
                            </div>    
                        )
                    })
                }
                <button type='submit' className='bg-primary p-3 rounded-lg text-white-100 font-semibold hover:opacity-90 disabled:opacity-80' disabled={formLoading || loading}>{!formLoading ? 'Update Listing' : 'Updating...'}</button>

                {formError && (
                <p className='text-red-700'>{formError}</p>
                )}  
            </div>              
        </form>
    </main>
  )
}

export default UpdateListing