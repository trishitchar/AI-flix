import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSlice",
    initialState:{
        gptSearchViewToggle: false,
    },
    reducers:{
        addGptSearchViewToggle: (state,action) =>{
            state.gptSearchViewToggle = !state.gptSearchViewToggle
        }
    }
})

export const {addGptSearchViewToggle} = gptSlice.actions;
export default gptSlice.reducer;