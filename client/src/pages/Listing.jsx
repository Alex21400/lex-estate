import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCheck } from "react-icons/fa6";
import { BiSolidBed, BiSolidBath } from 'react-icons/bi';
import { FaParking } from 'react-icons/fa';
import { PiArmchairFill} from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Listing = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const params = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
                <div className='max-w-7xl mt-24 mb-10 mx-auto'>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{
                          swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                        }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className='h-96 w-full rounded-lg'
                    >
                        {listing?.imageUrls.map((url, index) => (
                            <SwiperSlide key={index}>
                                <div className='w-full h-full flex items-center justify-center'>
                                    <img src={url} alt='img' className='block w-full h-full object-cover'/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* THUMBNAIL */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={12}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className='thumbs mt-3 h-40 w-full rounded-lg'
                    >
                        {listing?.imageUrls.map((url, index) => (
                            <SwiperSlide key={index}>
                                <button className='flex h-full w-full items-center justify-center'>
                                    <img src={url} alt='img'/>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className='flex flex-col max-w-7xl mx-auto px-6 xl:px-0 my-7 gap-4'>
                    <h3 className='text-2xl font-semibold text-white-100'>
                        {listing?.title} - 
                        ${listing?.offer ? listing?.discountPrice.toLocaleString('en-US') : listing?.regularPrice.toLocaleString('en-US')}
                        {listing?.type === 'rent' && '/month'}
                    </h3>
                    <ul className='flex gap-4 flex-wrap'>
                        <li className='flex items-center gap-2 py-2 px-4 bg-secondary rounded-full text-white'>
                            <BiSolidBed />
                            {listing?.bedrooms > 1 ? `${listing?.bedrooms} beds` :  `${listing?.bedrooms} bed`}
                        </li>
                        <li className='flex items-center gap-2 py-2 px-4 bg-secondary rounded-full text-white'>
                            <BiSolidBath />
                            {listing?.bathrooms > 1 ? `${listing?.bathrooms} baths` :  `${listing?.bathrooms} baths`}
                        </li>
                        <li className='flex items-center gap-2 py-2 px-4 bg-secondary rounded-full text-white'>
                            <FaParking />
                            {listing?.parking ? `Parking Spot` :  `No Parking`}
                        </li>
                        <li className='flex items-center gap-2 py-2 px-4 bg-secondary rounded-full text-white'>
                            <PiArmchairFill/>
                            {listing?.furnished ? `Furnished` :  `Not Furnished`}
                        </li>
                    </ul>
                    <div className='flex items-center mt-4 gap-2 text-white-200 text-lg'>
                        <FaMapMarkerAlt size={18}/>
                        <p className='text-sm md:text-lg'>
                            {listing?.address}
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='bg-slate-500 w-full max-w-[160px] text-white text-center p-1 rounded-md flex items-center justify-center gap-2'>
                            {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
                            <FaCheck />
                        </p>
                        {listing?.offer && (
                            <p className='bg-green-900 w-full max-w-[160px] text-white text-center p-1 rounded-md'>
                                {calculateDiscount(+listing.discountPrice, +listing.regularPrice)}% OFF 
                            </p>
                        )}
                    </div>
                    <div>
                        <h4 className='text-xl text-white-100 font-medium my-3'>About:</h4>
                        <p className='text-white-100 mb-6'>
                            {listing?.description}
                        </p>
                    </div>
                    
                    <Link 
                        className='bg-primary py-2 px-4 font-medium text-white rounded-full max-w-max'
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