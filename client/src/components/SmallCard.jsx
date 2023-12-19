import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const SmallCard = ({ listing }) => {
  // Get the percentages of discount
  const calculateDiscount = (discountPrice, regularPrice) => {
    return Math.floor(100 - (discountPrice / regularPrice) * 100);
  }

  // Shorten the address
  const truncateAddress = (address, length) => {
    if(address.length > length) {
      return address.substring(0, length).concat('...');
    }

    return address
  }

  return (
    <Link to={`/listings/${listing._id}`}>
      <div className='relative flex flex-col rounded-lg bg-black-200 shadow-md overflow-hidden xs:w-[290px] h-full w-full mx-auto hover:scale-105 transition duration-500'>
        {listing.discountPrice > 10 && (
          <p className='ribbon'>
            {calculateDiscount(listing.discountPrice, listing.regularPrice)}% DISCOUNT
          </p>
        )}
        <div className='w-full h-[250px] rounded-b-lg'>
          <img src={listing?.imageUrls[0]} alt='listing-image' className='w-full h-full object-cover'/>
        </div>

        <div className='absolute bg-white-100 bg-opacity-75 text-black rounded-full p-2 top-[10px] left-[10px] flex items-center gap-2'>
            <FaMapMarkerAlt size={18}/>
            <p className='line-clamp-1'>{truncateAddress(listing?.address, 20)}</p>
        </div>

          <h4 className='text-white-100 text-lg font-semibold line-clamp-2'>{listing?.title}</h4>
          <p className='text-orange-300 font-semibold whitespace-nowrap'>
            {listing.discountPrice ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' ? ' $ / month' : '$'}
          </p>

          <span className='flex-grow'></span>

        <div className='mt-2 px-2 pb-3 flex items-center gap-3'>
          <p className='text-sm'>
            {listing?.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
          </p>
          <span>|</span>
          <p className='text-sm'>
            {listing?.bathrooms > 1 ? `${listing?.bathrooms} baths` :  `${listing?.bathrooms} baths`}
          </p>
          <span>|</span>
          <p className='text-sm'>
            {listing?.furnished ? `Furnished` :  `Not Furnished`}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SmallCard