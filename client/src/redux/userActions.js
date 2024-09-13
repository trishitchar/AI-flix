import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constants.js';
import { addLikedVideo, removeLikedVideo } from './userSlice.js';

export const toggleLikedVideo = (email, videoId, action) => async (dispatch) => {
    try {
        const response = await axios.post(`${USER_API_END_POINT}/likedVideo`, {
            email,
            liked: videoId,
            action
        });

        if (response.data.success) {
            // Dispatch correct action based on like or dislike
            if (action === 'like') {
                dispatch(addLikedVideo(response.data.liked));
            } else if (action === 'dislike') {
                dispatch(removeLikedVideo(videoId));
            }
            return { success: true, message: response.data.message };
        } else {
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Error toggling liked video:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || "An error occurred while processing your request." 
        };
    }
};
