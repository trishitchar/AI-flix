import React from 'react'
import Header from './Header'
import  useNowPlayingMovies  from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopular from '../hooks/usePopular';
import useTopRated from '../hooks/useTopRated';
import useUpcoming from '../hooks/useUpcoming';
import { useSelector } from 'react-redux';
import GptSearch from './GptSearch';


const Browse = () => {
  useNowPlayingMovies();
  usePopular();
  useTopRated();
  useUpcoming();
  
  // to switch between movies and gpt search page
  const showGptSearchView = useSelector((store) => store.gpt.gptSearchViewToggle);

  return (
    <div className="bg-black min-h-screen">
      <Header />
      {
        showGptSearchView ? <GptSearch/> : 
        <>
          <MainContainer/>
          <SecondaryContainer/>
        </> 
      }
    </div>
  );
};

export default Browse;