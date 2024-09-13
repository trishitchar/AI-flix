import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'Tchar';

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
        const existingUser = await User.findOne({ email }).exec();
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
            sameSite: 'none', // Cookie is sent only for same-site requests,Important for cross-site cookies
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration time
            path: '/', // Ensure cookie is available on all pages
        });

        const userWithoutPassword = existingUser.toObject();
        delete userWithoutPassword.password;

        return res.status(200)
        .json({ message: `Welcome back ${userWithoutPassword.name}`, success: true, token, user: userWithoutPassword });
        
    //     .cookie('token', token, { 
    //       httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    //       secure: true, // Ensures the cookie is sent over HTTPS only
    //       sameSite: 'none', // Cookie is sent only for same-site requests
    //       maxAge: 24 * 60 * 60 * 1000,
    //   })

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};


export const logOut = async (req, res) => {
    try {
        await res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            // expires: new Date(0),
            // secure: process.env.NODE_ENV === 'production'
            maxAge: 0,
            path: '/',
        });
        res.status(200).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// new route for test / auth
export const checkAuth = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated", success: false });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ message: "User not found", success: false });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(401).json({ message: "Invalid token", success: false });
    }
  };