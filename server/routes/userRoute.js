import express from 'express';
import { signUp, login, logOut } from '../controllers/UserController.js';

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logOut);

export default router;
