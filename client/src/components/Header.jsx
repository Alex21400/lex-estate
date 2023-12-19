import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import logo from '../assets/logo.png';
import { useDispatch } from 'react-redux';
import { signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import { IoIosArrowDropupCircle } from "react-icons/io";

const Header = () => {
  const { currentUser } = useSelector(state => state.user);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const dispatch = useDispatch();

  // toggle mobile menu
  const toggleMenu = () => {
    setMobileMenu(prev => !prev);
  }

  // toggle dropdown menu
  const toggleDropdownMenu = () => {
    setDropdownMenu(prev => !prev);
  }

  //logout user
  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');

      const data = await res.json();

      if(res.ok) {
        dispatch(signOutUserSuccess());
      }
    } catch(error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <div className='w-full bg-black-200 shadow-md fixed top-0 left-0 z-50'>
        <nav className='relative max-w-7xl mx-auto rounded-full px-6 lg:px-0 py-4'>
            <div className='flex justify-between md:items-center '>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={logo} alt="" className='w-[60px]'/>
                    <p className='text-xl font-semibold'><span className='text-primary'>Lex</span>Estate</p>
                </Link>
                
                <ul className='hidden md:flex md:items-center gap-6'>
                    <li className='hidden sm:inline text-dark-blue font-medium text-lg hover:text-white-200'>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className='hidden sm:inline text-dark-blue font-medium text-lg hover:text-white-200'>
                        <Link to={"/about"}>About</Link>
                    </li>
                    <li className='hidden sm:inline text-dark-blue font-medium text-lg hover:text-white-200'>
                        <Link to={"/listings?searchTerm="}>Listings</Link>
                    </li>
                </ul>

                {currentUser ? (
                        <div>
                            <ul>
                                <li className='hidden md:flex relative items-center px-3 py-1 gap-2 rounded-full border'>
                                    <img className='rounded-full h-8 w-8 object-cover' src={currentUser.photo} alt={currentUser.username} />
                                    <div className='flex items-center gap-2 cursor-pointer' onClick={toggleDropdownMenu}>
                                        <p>{currentUser.username}</p>
                                        <IoIosArrowDropupCircle  size={20} className={`${dropdownMenu ? '' : 'rotate-180'}`}/>
                                    </div>
                                </li>
                                {dropdownMenu && (
                                    <div className='absolute top-[80px] right-[30px] p-6 bg-black-200 rounded-lg z-10'>
                                        <ul className='flex flex-col items-center gap-4'>
                                            <li className='text-white-100 text-lg hover:underline'>
                                                <Link to={'/user-profile'}>Your Profile</Link>
                                            </li>
                                            <li className='text-white-100 text-lg hover:underline'>
                                                <Link to={'/create-listing'}>Create a Listing</Link>
                                            </li>
                                            <li className='text-white-100 text-lg hover:underline'>
                                                <Link to={'/user-profile/userListings'}>Your Listings</Link>
                                            </li>
                                            <li className='text-white-100 text-lg hover:underline' onClick={() => handleSignout()}>
                                                Sign Out
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <ul className='flex items-center gap-4'>
                            <li className='hidden sm:inline border-dark-blue border-2 text-dark-blue font-medium px-4 py-2 rounded-full text-lg'>
                                <Link to={"/sign-up"}>Sign Up</Link>
                            </li>
                            <li className='hidden sm:inline bg-dark-blue border-dark-blue border-2 text-white font-medium px-4 py-2 rounded-full text-lg'>
                                <Link to={"/sign-in"}>Sign In</Link>
                            </li> 
                        </ul>
                    )}

                <ul id='mobileMenu' className={`absolute md:hidden z-50 left-0 w-full flex flex-col items-center gap-8 p-8 bg-black-200 trainsition-all ease-in duration-500 ${mobileMenu ? 'opacity-100 top-[74px]' : 'opacity-0 top-[-400px]'}`}>
                    <li 
                        className='font-medium text-lg'
                        onClick={() => setMobileMenu(false)}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li 
                        className='font-medium text-lg'
                        onClick={() => setMobileMenu(false)}>
                        <Link to={"/about"}>About</Link>
                    </li>
                    <li 
                        className='font-medium text-lg'
                        onClick={() => setMobileMenu(false)}>
                        <Link to={"/listings?searchTerm="}>Listings</Link>
                    </li>
                    {currentUser ? (
                        <>
                            <li 
                                className='font-medium text-lg'
                                onClick={() => setMobileMenu(false)}>
                                <Link to={"/user-profile"}>
                                    Your Profile
                                </Link>
                            </li>
                            <li 
                                className='font-medium text-lg'
                                onClick={() => setMobileMenu(false)}>
                                <Link to={"/create-listing"}>
                                    Create Listing
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li 
                                className='hidden sm:inline border-blue border-2 text-blue font-medium px-4 py-2 rounded-lg text-lg'
                                onClick={() => setMobileMenu(false)}>
                                <Link to={"/sign-up"}>Sign Up</Link>
                            </li>
                            <li 
                                className='hidden sm:inline bg-blue text-white font-medium px-4 py-2 rounded-lg text-lg'
                                onClick={() => setMobileMenu(false)}>
                                <Link to={"/sign-in"}>Sign In</Link>
                            </li>  
                        </>
                    )}
                </ul>

                <div className='flex items-center justify-center md:hidden cursor-pointer' onClick={() => toggleMenu()}>
                    {!mobileMenu ? <GiHamburgerMenu size={26} className='text-blue'/> : <IoClose size={28} className='text-blue'/>}        
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header