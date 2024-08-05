// selectors.js
import { createSelector } from 'reselect';

const getUser = (state) => state?.user?.user;
const getLikedVideos = (state) => state?.user?.likedVideos;
const getLiked = (state) => state?.user?.user?.liked;

export const selectAllLikedVideos = createSelector(
  [getLikedVideos, getLiked],
  (likedVideos, liked) => Array.from(new Set([...likedVideos, ...liked]))
);
