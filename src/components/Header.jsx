import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {auth }from '../utils/firebase'
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        if (window.location.pathname === '/') {
          navigate('/browse');
        }
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(removeUser());
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2 transition duration-300 ease-in-out bg-gradient-to-b from-black to-transparent">
      <img className="w-24 md:w-40 lg:w-48" src={logo} alt='AIFLIX logo' />
      {user && (
        <button
          className=' text-white hidden md:block lg:text-base md:text-base font-normal hover:opacity-80 py-1 px-1 rounded-md mr-2.5 bg-zinc-700'
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;