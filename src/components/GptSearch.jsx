import React from 'react'
import bg from '../assets/background_flix.jpg';

const GptSearch = () => {
  return (
    <div>
      <div className='w-ful'>GptSearch</div>
      <div className='absolute inset-0'>
        <img className='object-cover w-full h-full brightness-50' alt='background' src={bg} />
      </div>
    </div>
  )
}

export default GptSearch