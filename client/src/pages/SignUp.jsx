import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();

      if(res.ok) {
        setIsLoading(false);
        setError(null);
        navigate('/');
      } else {
        setError(data.message);
        setIsLoading(false);
      }
      
    } catch(error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='p-6 max-w-lg mx-auto border bg-slate-100 rounded-lg'>
      <h1 className='text-3xl text-center font-semibold my-6'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' name='username' value={formData.username} onChange={(e) => handleChange(e)}/>
        <input type="text" placeholder='Email' className='border p-3 rounded-lg' name='email' value={formData.email} onChange={(e) => handleChange(e)}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' name='password' value={formData.password} onChange={(e) => handleChange(e)}/>
        {error && <p className='text-red-500'>{error}</p>}
        <button disabled={isLoading} className='bg-slate-600 text-white p-3 rounded-lg font-semibold hover:opacity-90' type='submit'>{!isLoading ? 'Sign Up' : 'Loading...'}</button>
      </form>
      <div className='flex mt-5 gap-4'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"} className='text-blue-600 font-medium'>Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp