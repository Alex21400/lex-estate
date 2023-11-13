import React, { useEffect, useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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
    <div className='my-12 p-3 max-w-6xl bg-slate-50 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Your Listings</h1>

      <table className='w-full p-6 mt-5'>

        <thead>
          <tr>
            <th className='text-left'>Image</th>
            <th className='text-left'>Title</th>
            <th className='text-left'>Adress</th>
            <th className='text-left'>Price</th>
            <th className=''>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userListings?.length === 0 ? (
            <p>No Listings yet.</p>
          ): (
            userListings?.map((listing, index) => {
              return (
                <tr key={index}>
                  <td className='text-center p-4'>
                    <img className='w-[50px]' src={listing?.imageUrls[0]} alt='Listing Image' />
                  </td>
                  <td className='font-semibold text-lg'>
                    <Link className='hover:underline' to={`/listings/${listing?._id}`}>
                      {listing?.title}
                    </Link>
                  </td>
                  <td>{listing?.address}</td>
                  <td className='font-semibold text-lg'>${listing?.DicsountPrice ? listing?.discountPrice : listing?.regularPrice}</td>
                  <td className='flex items-center'>
                    <div className='flex items-center justify-center gap-4 mx-auto my-6'>
                      <Link to={`/update-listing/${listing?._id}`}>
                       <AiFillEdit size={25} />
                      </Link>
                      <RiDeleteBin7Fill size={25} onClick={() => handleDelete(listing?._id)}/>
                    </div>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>

    </div>
  )
}

export default UserListings