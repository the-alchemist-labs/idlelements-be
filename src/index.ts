import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { initializeSockets } from './sockets/sockets';
import connectDB from './utils/mongodb';
import { friends } from './routes/friends';
import { config } from './config';
import { errorMiddleware } from './utils/middlewares';
import { players } from './routes/players';

const app = express();

const server = http.createServer(app);
export const io = new Server(server);

app.use(bodyParser.json());

app.use('/friends', friends);
app.use('/players', players);

app.use(errorMiddleware);

server.listen(config.port, async () => {
  await Promise.all([
    connectDB(),
    initializeSockets(io),
  ]);
  console.log(`Server is running on port :${config.port}`);
});