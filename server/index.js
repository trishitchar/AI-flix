import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './utils/db.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';

dotenv.config();
const app = express();

dbConnection();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the Tchar AIFLIX API');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
