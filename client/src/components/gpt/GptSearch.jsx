import React from 'react'
import bg from '../../assets/background_flix.jpg';
import GptSearchBar from './GptSearchBar';
import GptSearchResults from './GptSearchResults';

const GptSearch = () => {
  return (
    <div>
      <div className='flex justify-center relative z-10 text-white items-center flex-col h-full xl:pt-40  lg:pt-40 md:pt-28 sm:pt-24 pt-20 w-screen overflow-hidden '>
        <div className='z-30 w-full h-20'>
          <GptSearchBar/>
        </div>
        <div className="w-11/12">
          <GptSearchResults/>
        </div>
      </div>
      <div className='absolute inset-0'>
        <img className='object-cover w-full h-full brightness-50' alt='background' src={bg} />
      </div>
    </div>
  )
}

export default GptSearch