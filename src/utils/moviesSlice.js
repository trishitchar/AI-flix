import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowTrailer: null,
    nowPopular: null,
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
    }
  },
});

export const { addNowPlayingMovies, addNowTrailer, addNowPopular } = moviesSlice.actions;
export default moviesSlice.reducer;
