import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; 

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

        res.status(201).json({ message: "User registered successfully", success: true });

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

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", success: true, token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
