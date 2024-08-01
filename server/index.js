import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './utils/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

dbConnection();

app.get('/', (req, res) => {
  res.send('Tchar');
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
