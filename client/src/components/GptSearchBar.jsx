import React, { useRef } from 'react';
import ShimmerUi from './ShimmerUi';
import useGeminiResult from '../hooks/useGeminiSearch';
import { Link } from 'react-router-dom';

const GptSearchBar = () => {
  const inputRef = useRef();
  const {error, recommendations, searchMovies } = useGeminiResult();

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    if (query) {
      const data = await searchMovies(query);
      if(!data) return <ShimmerUi/>
    }
  };

  const sendtopom = () =>{
    const query = inputRef.current.value;
    if (query) {
      window.open(`https://pom-pom-beta.vercel.app/search/${query}`, '_blank');
    }
  }

  return (
    <div>
      <div className='w-4/6 mx-auto'>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            className="xl:text-base lg:text-base md:text-sm sm:text-sm text-xs rounded-l-full font-normal text-black border-black border-2 xl:pl-5 md:pl-4 sm:pl-4 pl-3 lg:pl-5 xl:py-3 lg:py-3 md:py-2.5 sm:py-2 py-1.5 xl:w-9/12 md:w-10/12 w-9/12 sm:w-10/12 lg:w-9/12"
            placeholder="Search any type of movie you want using AI?"
            ref={inputRef}
          />
          <button
            type="submit"
            className="bg-green-700 xl:py-3 lg:py-3 md:py-2.5 sm:py-2 py-1.5 xl:px-8 sm:px-4 px-2 md:px-6 lg:px-8 font-bold xl:text-base lg:text-base md:text-sm sm:text-sm text-xs xl:w-3/12 md:w-2.5/12 sm:w-2/12 w-1.5/12 lg:w-3/12 rounded-r-full "
            >
            Search with AI
          </button>
        </form>
        </div>

        {error && (
          <div className="text-red-500 mt-4 text-center z-50 bg-black m-2 p-3">
            ⚠️ Alert: Horny user detected. This may help you: <button onClick={sendtopom} className="font-bold hover:underline hover:text-blue-600">NSFW</button>
          </div>
        )}
        {/* {recommendations && <div className="mt-4">{recommendations}</div>} */}
    </div>
  );
};

export default GptSearchBar;
