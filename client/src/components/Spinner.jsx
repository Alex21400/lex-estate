import React from 'react';
import spinnerImg from '../assets/Spinner.gif';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center w-full h-full fixed top-0 left-0 flex-col z-20 bg-black bg-opacity-20'>
        <img src={spinnerImg} alt="Loading..." />
    </div>
  )
}

export default Spinner