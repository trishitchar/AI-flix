import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowTrailer: null,
    nowPopular: null,
    topRated: null,
    upcoming: null,
    movieInfo: null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addNowTrailer: (state, action) => {
      state.nowTrailer = action.payload;
    },
    addNowPopular: (state, action) => {
      state.nowPopular = action.payload;
    },
    addTopRated: (state,action) =>{
      state.topRated = action.payload;
    },
    addUpcoming: (state,action) =>{
      state.upcoming = action.payload;
    },
    addMovieInfo:(state,action) =>{
      state.movieInfo = action.payload;
    },
    removeMovies: (state) => {
      state.nowPlayingMovies = null;
      state.nowTrailer = null;
      state.nowPopular = null;
      state.topRated = null;
      state.upcoming = null;
      state.movieInfo = null;
    }
  },
});

export const { addNowPlayingMovies, addNowTrailer, addNowPopular, addTopRated, addUpcoming,addMovieInfo, removeMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
