import React from 'react'
import Header from './Header'
import  useNowPlayingMovies  from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopular from '../hooks/usePopular';

const Browse = () => {
  useNowPlayingMovies();
  usePopular();
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  );
};

export default Browse;