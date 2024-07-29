"use client"
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Header from './Header';
import bg from '../assets/background_flix.jpg';
import { checkValidDataSignIn, checkValidDataSignUp } from '../utils/validate';
import { auth } from "../utils/firebase";
import { addUser } from '../utils/userSlice';

const Login = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  //signIn
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const message = checkValidDataSignIn(email, password);
    if (message) {
      setErrorMessage(message);
      return;
    }


    //if no error, signin with google
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
    } catch (error) {
      setErrorMessage(`${error.code}: ${error.message}`);
    }
  };

  //signup logic
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const message = checkValidDataSignUp(name, email, password);
    if (message) {
      setErrorMessage(message);
      return;
    }

    //if no error signup with google
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      const { uid, email: userEmail, displayName } = auth.currentUser;
      dispatch(addUser({ uid, email: userEmail, displayName }));
    } catch (error) {
      setErrorMessage(`${error.code}: ${error.message}`);
    }
  };

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <Header />
      <div className='absolute inset-0 flex justify-center items-center'>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className='flex flex-col justify-center items-center bg-black bg-opacity-70 p-8 rounded-lg z-10 sm:m-2'>
          <h1 className="font-bold text-3xl py-4 text-white">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {isSignUp && (
            <input
              type='text'
              ref={nameRef}
              placeholder='Enter your name'
              className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80'
              required
            />
          )}
          <input
            type='email'
            ref={emailRef}
            placeholder='Enter your email'
            className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80'
            required
          />
          <input
            type='password'
            ref={passwordRef}
            placeholder='Enter your password'
            className='p-2 m-2 border border-gray-300 rounded-lg outline-none w-80'
            required
          />
          <button type='submit' className='bg-red-600 text-white m-2 p-2 rounded-md shadow-md w-80 hover:bg-red-700 focus:outline-none'>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <button type='button' onClick={toggleSignUp} className='text-blue-500 hover:underline mt-2'>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
      <div className='absolute inset-0'>
        <img className='object-cover w-full h-full brightness-50' alt='background' src={bg} />
      </div>
    </div>
  );
};

export default Login;