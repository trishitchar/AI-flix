import React from 'react';
import Header from './Header';
import bg from '../assets/background_flix.jpg';

const Login = () => {
  return (
    <div className='relative w-full h-screen'>
      <Header />
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <form className='flex justify-center items-center flex-col bg-black bg-opacity-50 p-8 rounded-lg z-10'>
          <input 
            type='text' 
            placeholder='Enter your email' 
            className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80' 
          />
          <input 
            type='password' 
            placeholder='Enter your password' 
            className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80' 
          />
          <button className='bg-red-600 text-white m-2 p-2 rounded-md shadow-md w-80 hover:bg-red-700 focus:outline-none'>
            Sign In
          </button>
        </form>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          className="object-cover w-full h-full brightness-50"
          alt="background"
          src={bg}
        />
      </div>
    </div>
  );
};

export default Login;
