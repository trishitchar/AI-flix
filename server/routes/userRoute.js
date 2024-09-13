import express from 'express';
import { signUp, login, logOut, checkAuth } from '../controllers/UserController.js';
import { LikedVideo, RemoveLikedVideo } from '../controllers/FeatureController.js';

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logOut);
router.post("/likedVideo",LikedVideo);
router.post("/removeLikedVideo", RemoveLikedVideo);
router.get("/checkAuth", checkAuth)

export default router;
