import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // Handle search
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  // If url changes set searchTerm according to urlParams
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm');

    if(searchTerm) {
        setSearchTerm(searchTerm);
    }
  }, [location.search])

  return (
    <header className='bg-slate-100 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='text-xl sm:text-2xl lg:text-3xl flex-wrap'>
                <span className='text-bold text-orange-300'>LEX</span>
                <span className='text-black'>Estate</span>
            </h1>
            <form onSubmit={handleSubmit} className='bg-slate-200 flex items-center'>
                <button type='submit'>
                    <HiSearch size={22} className='mx-2'/>
                </button>
                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='bg-transparent p-2 rounded-lg focus:outline-none w-24 sm:w-64'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </form>
            <ul className='flex items-center gap-4'>
                <li className='hidden sm:inline hover:text-slate-600 font-semibold text-xl'>
                    <Link to={"/"}>Home</Link>
                </li>
                <li className='hidden sm:inline hover:text-slate-600 font-semibold text-xl'>
                    <Link to={"/about"}>About</Link>
                </li>
                {currentUser ? (
                    <li>
                        <Link to={"/user-profile"}>
                            <img className='rounded-full h-8 w-8 object-cover cursor-pointer' src={currentUser.photo} alt={currentUser.username} />
                        </Link>
                    </li>
                ) : (
                    <li className='hidden sm:inline hover:text-slate-600 font-semibold text-xl'>
                    <   Link to={"/sign-in"}>Sign In</Link>
                    </li>
                )}
            </ul>
        </div>
    </header>
  )
}

export default Header