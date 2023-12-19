import { useEffect, useState } from 'react';
import heroImg from '../assets/hero-img.jpg';
import smallHouse from '../assets/small-house.jpg';
import buildings from '../assets/buildings.jpg';
import { HiSearch } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { slideIn } from '../utils/motion';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // Handle search
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/listings?${searchQuery}`);
  }

  // If url changes set searchTerm according to urlParams
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm');

    if(searchTerm) {
        setSearchTerm(searchTerm);
    }
  }, [location.search]);

  return (
    <div className='px-6 xl:px-0 mt-28'>
        <div className='max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row gap-6 mt-12'>
            {/* LEFT */}
            <div 
                variants={slideIn('left', 'spring', 0.2, 0.75)}
                initial='hidden'
                animate='show'
                className='flex flex-col gap-6 max-w-lg md:max-w-md lg:max-w-lg relative'
            >
                <h2 className='text-3xl lg:text-4xl text-blue font-semibold'>Easy way to find your dream house & real estate</h2>
                <p>Unlock unbeatable support in your selling journey! Join the revolution and experience a quicker, smartey way to sell with the most complete source of homes for sale & rent.</p>

                <form 
                    onSubmit={handleSubmit} 
                    className='bg-white p-2 rounded-lg flex items-center justify-between'
                    variants={slideIn('left', 'spring', 0.75, 0.75)}
                    initial='hidden'
                    animate='show'
                >
                    <div className='flex items-center'>
                    <HiSearch size={24} className='mx-2 text-black-100'/>
                    <input 
                        type="text" 
                        placeholder='Search...' 
                        className='bg-transparent text-black-100 p-2 rounded-lg focus:outline-none w-24 lg:w-64'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <button className='bg-blue px-4 py-2 bg-primary text-white font-semibold rounded-lg '>
                    Search
                    </button>    
                </form>
            </div>

            {/* RIGHT */}
            <div 
                className='w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] lg:w-[30rem] lg:h-[30rem] overflow-hidden rounded-t-full mx-auto lg:mx-0'
                variants={slideIn('right', 'spring', 0.2, 0.75)}
                initial='hidden'
                animate='show'
            >
                <img src={heroImg} alt="hero-img" className='w-full h-full' />
            </div>
        </div>

        {/* CARDS */}
        <div className='max-w-7xl mx-auto flex my-20 gap-8 flex-col md:flex-row md:justify-between'>

            <div className='flex flex-col gap-4 items-center p-8 rounded-xl bg-black-200 shadow-lg'>
                <img src={smallHouse} alt="house.jpg" className=' rounded-full w-24 h-24 object-cover' />
                <div>
                <h3 className='text-blue text-2xl text-center mt-2'>I'm looking to buy a house</h3>
                <div className='bg-dark-blue w-1/2 mx-auto h-[3px] mt-3 rounded-full'></div>
                </div>
                <p className='text-secondary text-center'>With the most complete source of homes for sale for your satisfaction.</p>
                <Link 
                    className='bg-primary px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90'
                    to={'listings/?searchTerm=&type=sale'}
                >
                    Search Now
                </Link>
            </div>

            <div className='flex flex-col gap-4 items-center p-8 rounded-xl bg-black-200 shadow-lg'>
                <img src={buildings} alt="house.jpg" className='rounded-full w-24 h-24 object-cover'/>
                <div>
                <h3 className='text-blue text-2xl text-center mt-2'>I want to rent a real estate</h3>
                <div className='bg-dark-blue w-1/2 mx-auto h-[3px] mt-3 rounded-full'></div>
                </div>
                <p className='text-secondary text-center'>With the most complete source of real estate for sale for your satisfaction.</p>
                <Link 
                    className='bg-primary px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90'
                    to={'listings/?searchTerm=&type=rent'}
                >
                    Search Now
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero