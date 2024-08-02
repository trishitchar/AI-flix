import React from 'react';
import { useSelector } from 'react-redux';

const MovieStats = () => {
    const info = useSelector((state) => state.movies.movieInfo);

    if (!info) return <div className="text-center text-white">Loading...</div>;

    return (
        <div className='bg-gray-900 text-white min-h-screen p-8 '>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                {/* Left Section: Movie Details */}
                <div className='w-full md:w-2/3 lg:w-3/5'>
                    <h1 className='text-4xl font-bold mb-4'>{info.title}</h1>
                    <p className='text-lg mb-6'>{info.overview}</p>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>Release Date:</span> {info.release_date}
                    </div>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>Runtime:</span> {info.runtime} minutes
                    </div>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>Genres:</span> {info.genres.map((genre) => genre.name).join(', ')}
                    </div>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>Tagline:</span> {info.tagline}
                    </div>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>Budget:</span> ${info.budget.toLocaleString()}
                    </div>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>Revenue:</span> ${info.revenue.toLocaleString()}
                    </div>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>Vote Average:</span> {info.vote_average} ({info.vote_count} votes)
                    </div>
                    <div className='mb-6'>
                        <span className='text-lg font-semibold'>For More Information: visid IMDB:</span> <a href={`https://www.imdb.com/title/${info.imdb_id}`} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>{info.imdb_id}</a>
                    </div>
                </div>

                {/* Right Section: Movie Poster */}
                <div className='w-full md:w-1/3 lg:w-2/5 flex justify-center'>
                    <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt={info.title} className='rounded-lg shadow-lg border border-gray-700' />
                </div>
            </div>
        </div>
    );
};

export default MovieStats;
