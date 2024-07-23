import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        nowTrailer: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addNowTrailer: (state, action) => {
            state.nowTrailer = action.payload;
        }
    },
});

export const { addNowPlayingMovies, addNowTrailer } = moviesSlice.actions;
export default moviesSlice.reducer;