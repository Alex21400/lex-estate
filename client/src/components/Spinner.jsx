import React from 'react';
import spinnerImg from '../assets/Spinner.gif';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center w-full flex-col m-auto text-center'>
        <img src={spinnerImg} alt="Loading..." />
    </div>
  )
}

export default Spinner