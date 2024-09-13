import { User } from "../model/UserModel.js";

export const LikedVideo = async (req, res) => {
    const { email, liked, action } = req.body;

    if (!email || !liked || !action) {
        return res.status(400).json({
            message: "Email, Liked URL, and Action are required",
            success: false
        });
    }

    if (action !== 'like' && action !== 'dislike') {
        return res.status(400).json({
            message: "Invalid action. Must be 'like' or 'dislike'",
            success: false
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Ensure `user.liked` is an array
        user.liked = user.liked || [];

        if (action === 'like') {
            if (user.liked.includes(liked)) {
                return res.status(400).json({
                    message: "Video already liked",
                    success: false
                });
            }
            user.liked.push(liked);
        } else {
            const index = user.liked.indexOf(liked);
            if (index === -1) {
                return res.status(400).json({
                    message: "Video not found in liked list",
                    success: false
                });
            }
            user.liked.splice(index, 1);
        }

        await user.save();

        return res.status(200).json({
            message: action === 'like' ? "Video added to liked list" : "Video removed from liked list",
            success: true,
            liked: user.liked
        });

    } catch (error) {
        console.error("Error in LikedVideo handler:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const RemoveLikedVideo = async (req, res) => {
    const { email, liked } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required",
            success: false
        });
    }

    if (!liked) {
        return res.status(400).json({
            message: "Liked URL is required",
            success: false
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        user.liked = user.liked.filter(url => url !== liked);

        await user.save();

        return res.status(200).json({
            message: "Video removed from liked list",
            success: true,
            data: user.liked
        });

    } catch (error) {
        console.error("Error in RemoveLikedVideo handler:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};