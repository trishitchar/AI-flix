import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase'
import { addUser, removeUser } from '../utils/userSlice';
import { addGptSearchViewToggle } from '../utils/gptSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const showGptSearchView = useSelector((store) => store.gpt.gptSearchViewToggle);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleGptSearchClick = () => {
    dispatch(addGptSearchViewToggle());
    setIsMenuOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2 transition duration-300 ease-in-out bg-gradient-to-b from-black to-transparent">
      <img className="w-24 md:w-40 lg:w-48" src={logo} alt='AIFLIX logo' />
      {user && (
        <div className='flex items-center'>
          <button 
            className='md:hidden text-white p-2'
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'X' : '☰'}
            
          </button>
          <div className={`md:flex ${isMenuOpen ? 'flex flex-col absolute top-full right-0 bg-black p-4' : 'hidden'}`}>
            <button 
              className='p-2 m-2 text-xl font-bold bg-purple-600 rounded-md text-white hover:bg-purple-900 ease-in-out transition-opacity'
              onClick={handleGptSearchClick}
            >
              {showGptSearchView ? "AI flix" : "Gpt Search"}
            </button>
            <button
              className='text-white p-2 m-2 rounded-md bg-zinc-700 hover:bg-red-500 transition-opacity text-xl font-bold'
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;