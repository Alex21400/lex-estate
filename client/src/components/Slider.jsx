import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { sliderData } from '../sliderData';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 4000;

  // Move to the next slide
  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }
  
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }

  // On page load set current slider to 0
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    // Scroll automatically based on interval time
    let slideInterval;
    if(autoScroll) {
        const auto = () => {
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        auto();
    }

    return () => {
        clearInterval(slideInterval);
    }
  }, [currentSlide, autoScroll, slideInterval]);

  return (
    <div className=''>
      <div className="max-w-7xl md:mx-auto my-12 h-[60vh] relative overflow-hidden rounded-xl">
        <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
        <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>

        {sliderData.map((item, index) => {
            return (
                <div key={index} className={index === currentSlide ? 'slide current' : 'slide'}>
                    {index === currentSlide && (
                        <>
                          <img className='w-full h-full object-center object-cover' src={item.image} alt="slide-img" />
                          <div className='content w-[80%] sm:w-[50%] -mt-20'>
                                <h2 className='text-white text-xl lg:text-2xl mb-2 font-semibold'>{item.heading}</h2>
                                <p className='text-white-200 mb-2'>{item.description}</p>
                                <hr className='h-[2px] bg-white w-1/2'/>
                                <button className='px-3 py-2 font-semibold text-white-100 bg-primary rounded-lg mt-3 cursor-pointer'>
                                  <Link to={'/listings?searchTerm=&type=all&parking=false&furnished=false&offer=false&sort=createdAt&order=desc&minPrice=0&maxPrice=10000000'}>
                                    Take a Look
                                  </Link>
                                </button>
                          </div>
                        </>
                    )}
                </div>    
            )
        })}
      </div>
    </div>
  )
}

export default Slider