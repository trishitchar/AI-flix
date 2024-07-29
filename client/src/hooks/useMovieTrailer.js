import { useEffect } from 'react';
import {API_OPTIONS} from '../utils/constants'
import { useDispatch } from 'react-redux';
import { addNowTrailer } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const fetchVideo = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
            const json = await response.json();
            const filteredVideos = json.results.filter(video => video.type === "Trailer");
            const finalVideo = filteredVideos.length ? filteredVideos[0] : json.results[0];
            
            dispatch(addNowTrailer(finalVideo));
        } catch (error) {
            console.error("Error fetching movie trailer:", error);
        }
    }

    useEffect(() => {
        if (movieId) {
            fetchVideo();
        }
    }, [dispatch, movieId]);

}

export default useMovieTrailer;