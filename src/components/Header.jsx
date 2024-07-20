import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='bg-gradient-to-b from-black absolute w-full z-50 flex justify-between overflow-hidden items-center lg:px-10 md:px-10 sm:px-8 px-4'>
      <Link to={"/browse"}>
        <img className='lg:w-48 sm:w-28 w-20 md:w-40 md:py-6 py-4 lg:py-6' src={logo} alt="AIFLIX logo" />
      </Link>
    </div>
  );
};

export default Header;
