import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaMapMarker } from 'react-icons/fa';
import { BiSolidBed, BiSolidBath } from 'react-icons/bi';
import { FaParking } from 'react-icons/fa';
import { PiArmchairFill} from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Listing = () => {
  SwiperCore.use(Navigation);

  const params = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(listing);

  // Load listing 
  useEffect(() => {
    const fetchListing = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/listings/${params.id}`);

            const data = await res.json();
     
            if(res.ok) {
                setLoading(false);
                setListing(data);
            }
        } catch(error) {
            setLoading(false);
            setError(error.message);
        }
    }

    fetchListing();
  }, [params.id]);

  // Get the percentages of discount
  const calculateDiscount = (discountPrice, regularPrice) => {
    return Math.floor(100 - (discountPrice / regularPrice) * 100);
  }

  return (
    <main>
        {loading && <Spinner />}
        {listing && (
            <>
                <Swiper navigation>
                    {listing?.imageUrls.map(url => {
                        return (
                            <SwiperSlide key={url}>
                                <div className='h-[500px]' style={{ background: `url(${url}) center no-repeat`}}>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className='flex flex-col max-w-5xl mx-auto p-3 my-7 gap-4'>
                    <h3 className='text-2xl font-semibold'>
                        {listing?.title} - 
                        ${listing?.offer ? listing?.discountPrice.toLocaleString('en-US') : listing?.regularPrice.toLocaleString('en-US')}
                        {listing?.type === 'rent' && '/month'}
                    </h3>
                    <div className='flex items-center mt-4 gap-2 text-slate-600 text-lg'>
                        <FaMapMarker />
                        {listing?.address}
                    </div>
                    <div className='flex gap-4'>
                        <p className='bg-slate-600 w-full max-w-[160px] text-white text-center p-1 rounded-md'>
                            {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
                        {listing?.offer && (
                            <p className='bg-green-900 w-full max-w-[160px] text-white text-center p-1 rounded-md'>
                                {calculateDiscount(+listing.discountPrice, +listing.regularPrice)}% OFF 
                            </p>
                        )}
                    </div>
                    <div>
                        <h4 className='text-xl text-black font-medium'>About:</h4>
                        <p className='text-slate-800'>
                            {listing?.description}
                        </p>
                    </div>
                    <ul className='flex gap-4 flex-wrap'>
                        <li className='flex items-center gap-2 py-2 px-4 bg-slate-600 rounded-full text-white'>
                            <BiSolidBed />
                            {listing?.bedrooms > 1 ? `${listing?.bedrooms} beds` :  `${listing?.bedrooms} bed`}
                        </li>
                        <li className='flex items-center gap-2 py-2 px-4 bg-slate-600 rounded-full text-white'>
                            <BiSolidBath />
                            {listing?.bathrooms > 1 ? `${listing?.bathrooms} baths` :  `${listing?.bathrooms} baths`}
                        </li>
                        <li className='flex items-center gap-2 py-2 px-4 bg-slate-600 rounded-full text-white'>
                            <FaParking />
                            {listing?.parking ? `Parking Spot` :  `No Parking`}
                        </li>
                        <li className='flex items-center gap-2 py-2 px-4 bg-slate-600 rounded-full text-white'>
                            <PiArmchairFill/>
                            {listing?.furnished ? `Furnished` :  `Not Furnished`}
                        </li>
                    </ul>
                    <Link 
                        className='bg-slate-600 py-2 px-4 font-medium text-white rounded-lg max-w-max'
                        to={`mailto: ${listing?.userId?.email}?subject=Regarding ${listing?.title}`}>
                        Contact Landlord
                    </Link>
                </div>
            </>
        )}
    </main>
  )
}

export default Listing