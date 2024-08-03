import express from 'express';
import { signUp, login, logOut } from '../controllers/UserController.js';
import { LikedVideo } from '../controllers/FeatureController.js';

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logOut);
router.get("/likedVideo",LikedVideo);

export default router;
