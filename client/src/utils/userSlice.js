import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    likedVideos: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.likedVideos = [];
    },
    addLikedVideo: (state, action) => {
      const newVideo = action.payload;
      if (!state.likedVideos.includes(newVideo)) {
        state.likedVideos.push(newVideo);
      }
    },
    removeLikedVideo: (state, action) => {
      const videoToRemove = action.payload;
      state.likedVideos = state.likedVideos.filter(url => url !== videoToRemove);
    },
  },
});

export const { addUser, removeUser, addLikedVideo, removeLikedVideo } = userSlice.actions;
export default userSlice.reducer;
