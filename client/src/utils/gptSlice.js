import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSlice",
    initialState:{
        gptSearchViewToggle: false,
        movieName: null,
        movieResult: null
    },
    reducers:{
        addGptSearchViewToggle: (state,action) =>{
            state.gptSearchViewToggle = !state.gptSearchViewToggle
        },
        addGptMovieNameReult : (state,action) =>{
            state.movieName = action.payload.movieName;
            state.movieResult = action.payload.movieResult
        },
        removeGptMovieNameReult :(state) =>{
            state.movieName = null;
            state.movieResult = null;
        }
    }
})

export const {addGptSearchViewToggle,addGptMovieNameReult,removeGptMovieNameReult} = gptSlice.actions;
export default gptSlice.reducer;