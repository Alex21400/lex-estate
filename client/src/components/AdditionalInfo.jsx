import React from 'react';
import image1 from '../assets/about1.svg';
import image2 from '../assets/about2.svg';

const AdditionalInfo = () => {
  return (
    <div className='max-w-7xl mx-auto my-20 px-6 xl:px-0'>
        <div className='flex flex-col gap-28'>
          {/* FIRST */}
          <div className='flex items-center justify-between gap-8 sm:gap-20 px-4 sm:px-0 flex-col sm:flex-row'>
            <div className='flex flex-col gap-4 flex-1'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-[4px] bg-primary rounded-full'/>
                <p className='text-xl'>Why Choose Us</p>
              </div>
              <h2 className='text-4xl'>
                <span className='text-blue'>Provide </span>
                to find their satisfaction
              </h2>
              <p className='text-gray-500'>With the most complete source of homes for sale & real estate for You. Our job is to provide whatever You ask for.</p>
            </div>

            <div className='w-[16rem] h-[16rem] flex-1'>
              <img src={image1} alt="about-img.svg" className='w-full h-full' />
            </div>
          </div>
          {/* SECOND */}
          <div className='flex items-center justify-between gap-8 sm:gap-20 px-4 sm:px-0 flex-col flex-col-reverse sm:flex-row'>
            <div className='w-[16rem] h-[16rem] flex-1'>
              <img src={image2} alt="about-img.svg" className='w-full h-full' />
            </div>

            <div className='flex flex-col gap-4 flex-1'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-[4px] bg-primary rounded-full'/>
                <p className='text-xl'>Affordable Pricing</p>
              </div>
              <h2 className='text-4xl'>
                <span className='text-blue'>Affordable </span>
                House with good price
              </h2>
              <p className='text-gray-500'>Our price variants are conveyed to users with comfortable upscale facilities.</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdditionalInfo