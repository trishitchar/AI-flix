import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../utils/constants';
import toast from 'react-hot-toast';

const MovieStats = () => {
    const info = useSelector((state) => state.movies.movieInfo);
    const email = useSelector((state) => state.user.user.email);
    const key = useSelector((state) => state.movies.nowTrailer.key);

    if (!info) return <div className="text-center text-white">Loading...</div>;

    const handleLike = async () => {
        if (!email || !key) {
            console.error("Email or key is missing");
            return;
        }

        try {
            const response = await axios.post(`${USER_API_END_POINT}/likedVideo`, { email, liked: key });
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Error liking the video:", error);
        }
    };

    return (
        <div className='w-full'>
            <div className='flex justify-around w-5/6'>
                <button
                    className='m-2 p-2 bg-white text-black font-bold'
                    onClick={handleLike}
                >
                    ❤ Like The Video
                </button>
                <button
                    className='m-2 p-2 bg-white text-black font-bold'
                    // Add functionality for 'Watch Later' button here
                >
                    + Watch Later
                </button>
            </div>
            <div className='bg-gray-900 text-white min-h-screen p-8'>
                <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
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
                            <span className='text-lg font-semibold'>Genres:</span> {info.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
                        </div>
                        <div className='mb-6'>
                            <span className='text-lg font-semibold'>Tagline:</span> {info.tagline || 'N/A'}
                        </div>
                        <div className='mb-6'>
                            <span className='text-lg font-semibold'>Budget:</span> ${info.budget?.toLocaleString() || 'N/A'}
                        </div>
                        <div className='mb-6'>
                            <span className='text-lg font-semibold'>Revenue:</span> ${info.revenue?.toLocaleString() || 'N/A'}
                        </div>
                        <div className='mb-6'>
                            <span className='text-lg font-semibold'>Vote Average:</span> {info.vote_average} ({info.vote_count} votes)
                        </div>
                        <div className='mb-6'>
                            <span className='text-lg font-semibold'>For More Information: visit IMDB:</span> <a href={`https://www.imdb.com/title/${info.imdb_id}`} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>{info.imdb_id}</a>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 lg:w-2/5 flex justify-center'>
                        <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt={info.title} className='rounded-lg shadow-lg border border-gray-700 ' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieStats;
