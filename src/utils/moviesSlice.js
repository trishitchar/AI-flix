import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowTrailer: null,
    nowPopular: null,
    topRated: null,
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
    }
  },
});

export const { addNowPlayingMovies, addNowTrailer, addNowPopular, addTopRated } = moviesSlice.actions;
export default moviesSlice.reducer;
