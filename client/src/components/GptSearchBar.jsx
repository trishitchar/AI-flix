import React, { useRef } from 'react';
import useGeminiResult from '../hooks/useGeminiSearch';
// import useTmdbMovieSearch from '../hooks/useTmdbMovieSearch';
// import GptSearchResults from './GptSearchResults';

const GptSearchBar = () => {
  const inputRef = useRef();
  const { error, recommendations, searchMovies } = useGeminiResult();
  // const movieResults = useTmdbMovieSearch(recommendations);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    if (query) {
      await searchMovies(query);
    }
  };

  const sendtopom = () => {
    const query = inputRef.current.value;
    if (query) {
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='w-full sm:w-4/6 mx-auto'>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
          <input
            type='text'
            className="flex-grow p-2 rounded-l-full border-2 border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500"
            placeholder="Search any type of movie you want using AI?"
            ref={inputRef}
          />
          <button
            type="submit"
            className="bg-green-700 text-white p-2 rounded-r-full font-bold hover:bg-green-600"
          >
            Search with AI
          </button>
        </form>
      </div>

      {error && (
        <div className="flex justify-center mt-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-sm mx-4 w-full">
            <strong className="font-bold">⚠️ Alert:</strong>
            <span className="block sm:inline"> couln't find movie. This may help you: </span>
            <button
              onClick={sendtopom}
              className="font-bold text-blue-600 hover:underline mt-2 block"
            >
              Google
            </button>
          </div>
        </div>
      )}

      {/* <GptSearchResults movieResults={movieResults} /> */}
    </div>
  );
};

export default GptSearchBar;
