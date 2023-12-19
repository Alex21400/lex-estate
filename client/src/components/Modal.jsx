import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ modal, setModal }) => {
  useEffect(() => {
    if(modal) {
        setTimeout(() => {
            setModal(false);
        }, 3000)
    }
  }, [modal]);

  return (
    <div className="fixed w-[100vw] h-[100vh] inset-0 flex justify-center items-center">
          <div className="fixed w-[100vw] h-[100vh] inset-0 flex justify-center items-center bg-black bg-opacity-80">
            <div className="relative bg-black-200 text-center w-[400px] h-[280px] flex flex-col justify-center items-center rounded-lg">
              <h2 className='text-3xl sm:text-4xl'>Thank you</h2>
              <p className='text-xl my-2'>We will reply as soon as possible</p>
              <div className="absolute top-[1rem] right-[1rem]">
                <FaTimes onClick={() => setModal(false)} size={20}/>
              </div>
              <button className='bg-primary rounded px-6 py-3 my-4 text-gray-200 font-medium w-[100px]' onClick={() => setModal(false)}>
                Ok
              </button>
            </div>
          </div>
        </div>
  )
}

export default Modal