import dotenv from 'dotenv';
import express from 'express';
import { dbConnection } from './src/config/DBconfig.js';
import { userRouter } from './src/routes/UserRoutes.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { checkTokenExpiration, verifyToken } from './src/services/Jwt.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: "*"
}));
dbConnection();
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

// routes
app.use(express.json());
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3005;

const appServer = server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { appServer };
