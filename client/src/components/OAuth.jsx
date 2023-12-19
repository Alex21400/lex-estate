import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);

        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            })
        });

        const data = await res.json();
        
        if(res.ok) {
          dispatch(signInSuccess(data));
          navigate('/');
        } else {
          dispatch(signInFailure(data.message));
        }
    } catch(error) {
        console.log(error.message);
    }
  }

  return (
    <button className='p-3 bg-slate-100 text-black-100 w-full rounded-lg font-semibold mt-5 flex justify-center items-center gap-3' type='button' onClick={handleGoogleClick}>
        Continue with Google
        <FcGoogle size={20}/>
    </button>
  )
}

export default OAuth