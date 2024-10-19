import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './utils/db.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import keepAlive from './utils/keepAlive.js';

dotenv.config();
const app = express();

dbConnection();

const corsAllowOrigin = {
  // origin: ['http://localhost:5173', 'https://ai-flix.onrender.com', 'https://aiflix-tc.vercel.app', 'https://aiflix.trishitchar.tech'],
  origin: '*',
  credentials: true
};
app.use(cors(corsAllowOrigin));

app.use(express.json({ 
  limit: '10mb', 
  type: 'application/json' 
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (req.path === '/' && token) {
    return res.redirect('/browse');
  }

  if (req.path === '/browse' && !token) {
    return res.redirect('/');
  }

  next();
};

app.use(authMiddleware);

app.use("/api/user", userRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the Tchar AIFLIX API');
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON Parsing Error:', err.message);
    res.status(400).json({ message: "Invalid JSON format", success: false });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.type === 'stream.not.readable') {
    console.error('Stream Not Readable Error:', err.message);
    res.status(500).json({ message: "Stream not readable", success: false });
  } else {
    console.error('Server Error:', err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  keepAlive();
});
