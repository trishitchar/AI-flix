import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'Tchar';

app.use(cookieParser());

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully", success: true });

    } catch (error) {
        console.error("SignUp Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: true, // Ensures the cookie is sent over HTTPS only
            sameSite: 'none', // Cookie is sent only for same-site requests
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration time
          });

        return res.status(200)
        .json({ message: `Welcome back ${existingUser.name}`, success: true, token, user: existingUser });
        
        //   .cookie("token", token, { httpOnly: false, secure: process.env.NODE_ENV === 'production' })

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};


export const logOut = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: false, 
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
