import React from 'react'
import { HiSearch } from 'react-icons/hi'

const Header = () => {
  return (
    <header className='bg-slate-100 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='text-xl sm:text-2xl lg:text-3xl flex-wrap'>
                <span className='text-bold text-orange-300'>LEX</span>
                <span className='text-black'>Estate</span>
            </h1>
            <form className='bg-slate-200 flex items-center'>
                <HiSearch size={22} className='mx-2'/>
                <input type="text" placeholder='Search...' className='bg-transparent p-2 rounded-lg focus:outline-none w-24 sm:w-64' />
            </form>
            <ul className='flex items-center gap-4'>
                <li className='hidden sm:inline hover:text-slate-600 font-semibold text-xl'>
                    <a href="/">Home</a>
                </li>
                <li className='hidden sm:inline hover:text-slate-600 font-semibold text-xl'>
                    <a href="/about">About</a>
                </li>
                <li className='hidden sm:inline hover:text-slate-600 font-semibold text-xl'>
                    <a href="/sign-in">Sign In</a>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header