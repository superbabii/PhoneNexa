// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import esl from 'modesl';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';

import Message from './models/Message.js';
import { verifyToken } from './utils/auth.js'; // Import verifyToken function

dotenv.config();

const app = express();
const PORT = 3030;
// const PORT = 433;

const corsOptions = {
  credentials: true,
  origin: 'https://www.phonenexa.com'
  // origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MDB_URL);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/message', messageRoutes);

const httpServer = createServer(app);

// Configure WebSocketServer and integrate it with the HTTP server
const io = new Server(httpServer, {
  cors: {
    // origin: 'http://localhost:3000',
    origin: 'https://www.phonenexa.com',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const esl_server = new esl.Server({port: 8085, myevents:true}, function(){
  console.log("esl server is up");
});

esl_server.on('connection::ready', function(conn, id) {
  console.log('new call ' + id);
  conn.call_start = new Date().getTime();

  conn.execute('answer');
  conn.execute('echo', function(){
      console.log('echoing');
  });

  conn.on('esl::end', function(evt, body) {
      this.call_end = new Date().getTime();
      var delta = (this.call_end - this.call_start) / 1000;
      console.log("Call duration " + delta + " seconds");
  });
});

const users = {};

io.on('connection', (socket) => {
  try {
    // Socket.IO connection error
    console.log(`User connected:`, socket.id);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      notifyAboutOnlinePeople();
    });

    // Read the email and id from the cookie for this connection
    authenticateConnection(socket);

    socket.on("join", (userID) => {
      socket.join(userID);
    })
    // Handle incoming messages
    socket.on('sendMessage', async (messageData) => {
      if (messageData) {
        try {
          // Save the message to MongoDB
          const newMessage = await Message.create({
            sender: messageData.sender,
            receiver: messageData.receiver,
            text: messageData.text,
          });

          socket.join(messageData.sender);
          // Send the message to the receiver
          console.log("messageData.sender", messageData.sender);

          io.to(messageData.receiver).emit('message', messageData);
        } catch (error) {
          console.error('Error creating message:', error);
        }
      }
    });

    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }

    socket.emit('yourID', socket.id);
    io.sockets.emit('allUsers', users);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      delete users[socket.id];
      io.sockets.emit('allUsers', users);
    });

    socket.on('callUser', (data) => {
      io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
    });

    socket.on('acceptCall', (data) => {
      io.to(data.to).emit('callAccepted', data.signal);
    });

    // Notify everyone about online people (when someone connects)
    notifyAboutOnlinePeople();
  } catch (error) {
    console.error('Socket.IO connection error:', error);
  }
});

// Function to notify all clients about online people
const notifyAboutOnlinePeople = () => {
  const onlineUsers = Object.values(io.sockets.sockets).map((socket) => ({
    userId: socket.userId,
    userName: socket.userName,
  }));

  io.emit('onlineUsers', onlineUsers)
};

// Authentication function
const authenticateConnection = (socket) => {
  const token = socket.handshake.headers.cookie?.split(';').find((str) => str.trim().startsWith('token='));
  if (token) {
    try {
      const userData = verifyToken(token.split('=')[1]);
      const { userId, userName } = userData;
      socket.userId = userId;
      socket.userName = userName;
    } catch (error) {
      console.error('Authentication failed:', error.message);
      socket.disconnect(true);
    }
  } else {
    console.error('Authentication failed: No token found');
    socket.disconnect(true);
  }
};

// Handle Socket.IO server shutdown gracefully
process.on('SIGINT', () => {
  io.close(() => {
    console.log('Socket.IO server closed');
    process.exit(0);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
