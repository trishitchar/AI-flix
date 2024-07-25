import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants"
import { addUpcoming } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcoming = () =>{
    const dispatch = useDispatch();
    const fetchMovies = async () =>{
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
            const jsonData = await response.json();
            dispatch(addUpcoming(jsonData.results));
            
        } catch (error) {
            console.log("error fetching Upcoming movie");
        }
    }
    useEffect(()=>{
        fetchMovies();
    },[dispatch])
}
export default useUpcoming;