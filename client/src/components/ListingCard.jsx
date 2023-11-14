import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  // Get the percentages of discount
  const calculateDiscount = (discountPrice, regularPrice) => {
    return Math.floor(100 - (discountPrice / regularPrice) * 100);
  }

  return (
    <Link to={`/listings/${listing._id}`}>
      <div className='flex flex-col gap-4 border-slate-600 border-2 bg-slate-50 rounded-lg shadow-md overflow-hidden w-full sm:w-[350px] relative hover:scale-105 transition-scale duration-300'>
        {listing.discountPrice && (
          <p className='ribbon'>
            {calculateDiscount(listing.discountPrice, listing.regularPrice)}% DISCOUNT
          </p>
        )}
        <img className='h-[320px] sm:h-[220px] w-full object-cover ' src={listing.imageUrls[0]} alt="listing-image" />
        <div className='p-3 flex flex-col gap-2'>
          <h4 className='text-slate-600 text-xl truncate'>{listing.title}</h4>
          <div className='flex gap-2 items-center text-slate-500'>
            <FaMapMarkerAlt size={18}/>
            <p className='truncate'>{listing.address}</p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
          <p className='font-semibold text-lg'>
            {listing.discountPrice ? listing.discountPrice.toLocaleString('en-US') : listing.regularPricetoLocaleString('en-US')}
            {listing.type === 'rent' ? ' $ / month' : '$'}
          </p>
          <ul className='flex flex-wrap gap-2'>
            <li className='px-3 py-1 bg-slate-600 text-white rounded-full'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`} 
            </li>
            <li className='px-3 py-1 bg-slate-600 text-white rounded-full'>
              {listing?.bathrooms > 1 ? `${listing?.bathrooms} baths` :  `${listing?.bathrooms} baths`}
            </li>
            <li className='px-3 py-1 bg-slate-600 text-white rounded-full'>
              {listing?.parking ? `Parking Spot` :  `No Parking`}
            </li>
            <li className='px-3 py-1 bg-slate-600 text-white rounded-full'>
            {listing?.furnished ? `Furnished` :  `Not Furnished`}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard