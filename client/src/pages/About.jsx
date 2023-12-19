import React from 'react';
import aboutImg from '../assets/about.jpg';

const About = () => {
  return (
    <section className='my-28 px-6 xl:px-0'>
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-20'>
        <div className='flex flex-col'>
          <h2 className='text-primary text-2xl lg:text-4xl font-semibold mb-6'>About Us</h2>
          <p className='text-white-200 text-lg my-2'>
            At LexEstate, we understand that buying or selling a home is one of the most significant transactions in your life. That's why we are dedicated to making the process smooth, transparent, and rewarding. With a team of experienced and passionate real estate professionals, we are here to guide you every step of the way.
          </p>
         <h4 className='text-white-100 text-xl'>Our Mision:</h4>
          <p className='text-white-200 text-lg my-2'>
            Our mission is simple — to exceed your expectations and deliver unparalleled service. Whether you're a first-time homebuyer, a seasoned investor, or looking to sell your property, we tailor our approach to meet your unique needs. We are committed to integrity, professionalism, and building lasting relationships with our clients.
          </p>
          <h4 className='text-white-100 text-xl'>Why Choose LexEstate?</h4>
          <ul>
            <li className='my-4'>
              <h5>1. Expertise:</h5>
              <p className='ml-4 text-white-200'>Our team consists of seasoned real estate experts with in-depth knowledge of the local market trends. We stay updated on the latest developments to provide you with accurate and insightful advice.</p>
            </li>
            <li className='my-4'>
              <h5>2. Personalized Service:</h5>
              <p className='ml-4 text-white-200'>We believe in personalized service that goes beyond the transaction. Your goals are our priority, and we work tirelessly to ensure your real estate journey is seamless and stress-free.</p>
            </li>
            <li className='my-4'>
              <h5>3. Transparency:</h5>
              <p className='ml-4 text-white-200'>Transparency is at the core of our operations. From pricing strategies to negotiations, we keep you informed every step of the way, empowering you to make informed decisions.</p>
            </li>
          </ul>
        </div>

        <div className=''>
          <img src={aboutImg} alt="aboutImg.jpg" className='w-full h-full' />
        </div>
      </div>
    </section>
  )
}

export default About