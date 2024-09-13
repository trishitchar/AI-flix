import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addMovieInfo } from '../redux/moviesSlice';
import { useEffect } from 'react';

const useMovieInfo = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                    API_OPTIONS
                );
                const jsonData = await response.json();
                dispatch(addMovieInfo(jsonData));
            } catch (error) {
                console.error("Error fetching movie info:", error);
            }
        };

        if (id) {
            fetchMovies();
        }
    }, [dispatch, id]);
};

export default useMovieInfo;
