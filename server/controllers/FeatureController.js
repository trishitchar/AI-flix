import { User } from "../model/UserModel";

export const LikedVideo = async (req, res) => {
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

        user.liked.push(liked);

        await user.save();

        return res.status(200).json({
            message: "Video added to liked list",
            success: true,
            data: user.liked
        });

    } catch (error) {
        console.error("Error in LikedVideo handler:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
