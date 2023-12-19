import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import emailjs from '@emailjs/browser';
import Modal from './Modal';
import logo from '../assets/logo.png';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  // Handles form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        to_name: 'Alex',
        from_email: formData.email,
        to_email: 'saki.94@hotmail.com',
        message: formData.message
    }, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
        .then(() => {
            setLoading(false);
            setModal(true);

            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });
        }, (error) => {
            setLoading(false);
            console.log(error);
            alert('Sorry, something went wrong');
        })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  }

  return (
    <footer className='w-full bg-black-200'>
        <div className='max-w-7xl mx-auto mt-20 py-8 px-6 xl:px-0 flex justify-center md:justify-between'>
            <div className='hidden md:flex flex-col gap-2'>
                <Link to={'/'} className='font-medium'>
                    <p>Home</p>
                </Link>
                <Link to={'/about'} className='font-medium'>
                    <p>About Us</p>
                </Link>
                <Link to={'/listings?searchTerm='} className='font-medium'>
                    <p>Listings</p>
                </Link>
                <Link to={'/create-listing'} className='font-medium'>
                    <p>Create a Listing</p>
                </Link>
                <Link to={'#'} className='font-medium'>
                    <p>News</p>
                </Link>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <Link to={'/'} className='text-xl flex items-center gap-2'>
                    <img src={logo} alt="logo.png" className='w-[30px]'/>
                    <p><span className='text-primary'>Lex</span>Estate</p>
                </Link>
                <div className='flex gap-2'>
                    <FaMapMarkerAlt className='text-primary mt-1'/>
                    <p className='flex flex-col'>
                        <span>1908 W Lucas St, Florence,</span>
                        <span>South Carolina, 29501</span>
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <FaPhone className='text-primary'/>
                    <p>(843) 669-4546</p>
                </div>
                <div className='flex items-center gap-2'>
                    <MdEmail className='text-primary'size={18}/>
                    <p>lexestate@business.com</p>
                </div>
                <div className='flex items-center gap-2'>
                    <FaFacebook  className='cursor-pointer' size={20}/> |
                    <FaInstagram  className='cursor-pointer' size={20}/> |
                    <FaTwitter  className='cursor-pointer' size={20}/> |
                    <FaLinkedin className='cursor-pointer' size={20}/>
                </div>
            </div>
            <div className='hidden md:flex flex-col'>
                <h4 className='text-lg mb-2'>Contact Us</h4>
                <form className='flex flex-col gap-2' onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        type="text" 
                        placeholder='Your name...' 
                        name='name' 
                        value={formData.name} 
                        onChange={(e) => handleChange(e)} 
                        className='p-1 border rounded-md' />
                    <input 
                        type="text" 
                        placeholder='Your phone...' 
                        name='phone' 
                        value={formData.phone} 
                        onChange={(e) => handleChange(e)} 
                        className='p-1 border rounded-md'/>
                    <input 
                        type="text" 
                        placeholder='Your email...' 
                        name='email' 
                        value={formData.email} 
                        onChange={(e) => handleChange(e)} 
                        className='p-1 border rounded-md'/>
                    <textarea 
                        placeholder='Your message...' 
                        rows='4' 
                        name='message' 
                        value={formData.message} 
                        onChange={(e) => handleChange(e)} 
                        className='p-1 border rounded-md' />
                    <button 
                        type='submit' 
                        className='px-4 py-2 rounded-md bg-primary text-white font-medium max-w-fit'>
                        {!loading ? 'Send' : 'Loading...'}
                    </button>
                </form>
            </div>
        </div>
        <hr />
        <div className='max-w-7xl mx-auto'>
            <p className='text-center py-4'>2023&copy; All rights Reserved</p>
        </div>
        {modal && <Modal modal={modal} setModal={setModal}/>}
    </footer>
  )
}

export default Footer