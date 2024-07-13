import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { initializeSockets } from './sockets/sockets';
import connectDB from './utils/mongodb';
import { friends } from './routes/friends';
import { config } from './config';
import { errorMiddleware } from './utils/middlewares';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use('/friends', friends);

app.use(errorMiddleware);


server.listen(config.port, () => {
  connectDB();
  initializeSockets(io);
  console.log(`Server is running on port :${config.port}`);
});