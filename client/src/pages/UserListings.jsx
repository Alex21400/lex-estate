import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const UserListings = () => {
  const [userListings, setUserListings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/users/userListings');

        const data = await res.json();  
  
        if(res.ok) {
          setUserListings(data);
        } else {
          setError(data.message)
        }
      } catch(error) {
        setError(error.message);
      }
    }

    fetchListings();
    console.log(userListings);
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      
      if(res.ok) {
        console.log(data);
        setUserListings(prev => prev.filter(listing => listing._id !== id));
      }
    } catch(error) {
      setError(error.message)
    }
  }

  return (
    <div className='px-6 xl:px-0 mt-24'>
      <div className='my-12 max-w-7xl bg-black-200 mx-auto rounded-lg min-h-[700px]'>
        <h1 className='text-3xl font-semibold text-center py-6'>Your Listings</h1>
        <hr />
          
            {userListings?.length === 0 || !userListings ? (
              <p className='text-2xl text-white-100 text-center py-4'>No Listings yet.</p>
            ): (
              <ul className='user-listings'>
                {userListings?.map((listing, index) => {
                  return (
                    <li className='p-4 flex justify-between' key={index}>
                      <div className='flex gap-4'>
                        <img src={listing.imageUrls[0]} alt={listing?.title} className='w-20 h-20 hidden sm:block rounded-lg'/>

                        <Link to={`/listings/${listing?._id}`}>
                          <div className='flex flex-col gap-1'>
                            <p className='font-semibold text-sm xl:text-lg'>{listing?.title}</p>
                            <p className='font-semibold text-md xl:text-lg'>
                              ${listing?.DicsountPrice ? listing?.discountPrice.toLocaleString('en-US') : listing?.regularPrice.toLocaleString('en-US')}
                            </p>
                            <p className='flex items-center gap-2 text-secondary'>
                              <FaMapMarkerAlt size={18} />
                              {listing?.address}
                            </p>
                          </div>
                        </Link>
                      </div>
                      <div className='flex flex-col justify-center gap-3'>
                        <button className='px-2 py-1 bg-slate-400 text-white-100 font-medium rounded-lg'>
                          <Link to={`/update-listing/${listing?._id}`}>
                            Update
                          </Link>
                        </button>
                        <button 
                          className='px-2 py-1 bg-red-500 text-white-100 font-medium rounded-lg'
                          onClick={() => handleDelete(listing?._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>  
            )}
      </div>
    </div>
  )
}

export default UserListings

