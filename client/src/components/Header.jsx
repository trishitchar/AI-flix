import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { addGptSearchViewToggle } from '../utils/gptSlice';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constants';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const showGptSearchView = useSelector((store) => store.gpt.gptSearchViewToggle);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      if(window.location.pathname === '/') {
        navigate('/browse');
      }
    }else{
      navigate('/');
    }
  }, []);

  const handleSignOut = async () => {
    try {
        const response = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        if (response.data.success) {
            toast.success(response.data.message);
            dispatch(removeUser()); 
            navigate('/'); 
        } else {
            console.error('Sign out failed:', response.data.message);
        }
    } catch (error) {
        console.error('Error signing out: ', error);
    }
};


  const handleGptSearchClick = () => {
    dispatch(addGptSearchViewToggle());
    setIsMenuOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  }

  const GoToHomePage = async() => {
    navigate('/');
  }

  const goToPrifile = async() =>{
    navigate('/profile');
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2 transition duration-300 ease-in-out bg-gradient-to-b from-black to-transparent">
      <button onClick={GoToHomePage} className='cursor-pointer'>
        <img className="w-24 md:w-40 lg:w-48" src={logo} alt='AIFLIX logo' />
      </button>
      {user && (
        <div className='flex items-center'>
          <button 
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='md:hidden text-white p-2'
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'X' : '☰'}
          </button>
          <div className={`md:flex ${isMenuOpen ? 'flex flex-col absolute top-full right-0 bg-black p-4' : 'hidden'}`}>
            <button className="relative text-white font-bold" onClick={goToPrifile}>
              <p className="text-content">welcome {user.name}</p>
              <p className="text-hover">Go to Profile</p>
            </button>
            <button 
              aria-label='Toggle GPT search view'
              className='p-2 m-2 text-xl font-bold bg-purple-600 rounded-md text-white hover:bg-purple-900 ease-in-out transition-opacity'
              onClick={handleGptSearchClick}
            >
              {showGptSearchView ? "AI Flix" : "GPT Search"}
            </button>
            <button
              aria-label='Sign out'
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
