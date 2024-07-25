import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowTrailer: null,
    nowPopular: null,
    topRated: null,
    upcoming: null
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
  },
});

export const { addNowPlayingMovies, addNowTrailer, addNowPopular, addTopRated, addUpcoming } = moviesSlice.actions;
export default moviesSlice.reducer;
