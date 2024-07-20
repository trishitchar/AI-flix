import React, { useRef, useState } from 'react';
import Header from './Header';
import bg from '../assets/background_flix.jpg';
import { checkValidDataSignIn, checkValidDataSignUp } from '../utils/validate';

const Login = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signUp, setSignUp] = useState(false);
  const [validateMsg, setValidateMsg] = useState(null);

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  const handleSignIn = () => {
    const message = checkValidDataSignIn(emailRef.current.value, passwordRef.current.value);
    setValidateMsg(message);
    if (message) return;
    // Handle sign-in logic here
  };

  const handleSignUp = () => {
    const message2 = checkValidDataSignUp(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    setValidateMsg(message2);
    if (message2) return;
    // Handle sign-up logic here
  };

  return (
    <div className='relative w-full h-screen overflow-hidden text-white'>
      <Header />
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <form onSubmit={(e) => e.preventDefault()} className='flex flex-col justify-center items-center bg-black bg-opacity-70 p-8 rounded-lg z-10 sm:m-2'>
          <h1 className="font-bold text-3xl py-4 text-white justify-start">
            {!signUp ? "Sign In" : "Sign Up"}
          </h1>
          {validateMsg && <p className="text-red-500">{validateMsg}</p>}
          {signUp && (
            <input
              type='text'
              ref={nameRef}
              placeholder='Enter your name'
              className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80'
            />
          )}
          <input
            type='email'
            ref={emailRef}
            placeholder='Enter your email'
            className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80'
          />
          <input
            type='password'
            ref={passwordRef}
            placeholder='Enter your password'
            className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80'
          />
          {signUp ? (
            <button onClick={handleSignUp} className='bg-red-600 text-white m-2 p-2 rounded-md shadow-md w-80 hover:bg-red-700 focus:outline-none'>
              Sign Up
            </button>
          ) : (
            <button onClick={handleSignIn} className='bg-red-600 text-white m-2 p-2 rounded-md shadow-md w-80 hover:bg-red-700 focus:outline-none'>
              Sign In
            </button>
          )}
          <button type='button' onClick={toggleSignUp} className='text-blue-500 hover:underline mt-2'>
            {!signUp ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
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
