import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { loading, error } = useSelector(state => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res= await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(res.ok) {;
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        dispatch(signInFailure(data.message));
        return;
      }
    } catch(error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='lg:mt-32 mt-28 px-6 xl:px-0 min-h-[80vh]'>
      <div className='p-6 max-w-lg mx-auto border bg-black-200 rounded-lg'>
      <h1 className='text-3xl text-center font-semibold my-6'>
        Sign In
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Email' className='border p-3 rounded-lg bg-slate-50 text-black-100' name='email' value={formData.email} onChange={(e) => handleChange(e)}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg bg-slate-50 text-black-100' name='password' value={formData.password} onChange={(e) => handleChange(e)}/>
        {error && <p className='text-red-500'>{error}</p>}
        <button disabled={loading} className='bg-primary text-white p-3 rounded-lg font-semibold hover:opacity-90' type='submit'>{!loading ? 'Sign In' : 'Loading...'}</button>
      </form>
      <OAuth />
      <div className='flex mt-5 gap-4 justify-between'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"} className='text-blue-600 font-medium'>Sign Up</Link>
      </div>
      </div>
    </div>
  )
}

export default SignIn