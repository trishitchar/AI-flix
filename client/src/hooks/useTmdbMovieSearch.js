import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addGptMovieNameReult, removeGptMovieNameReult } from '../redux/gptSlice';

const useTmdbMovieSearch = (recommendations) => {
  const [movieResults, setMovieResults] = useState([]);
  const dispatch = useDispatch();

  const movieSearch = async (movie) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false`, API_OPTIONS);
    const data = await response.json();
    console.log(data.results)
    return data.results;
  };

  useEffect(() => {
    if (recommendations) {
      const movieList = recommendations.split(',').map(movie => movie.trim());
      const fetchMovies = async () => {
        const results = await Promise.all(movieList.map(movie => movieSearch(movie)));
        setMovieResults(results.flat()); 
      };
      fetchMovies();
    }
  }, [recommendations]);
  
  useEffect(() => {
    console.log('Dispatching Results:', { movieName: recommendations, movieResult: movieResults });
    dispatch(removeGptMovieNameReult())
    dispatch(addGptMovieNameReult({ movieName: recommendations, movieResult: movieResults }));
  }, [movieResults]);
  // return movieResults;
};

export default useTmdbMovieSearch;
