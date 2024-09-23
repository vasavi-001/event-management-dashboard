// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const socketIO = require('socket.io');
// require('dotenv').config();


// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, { cors: { origin: '*' } });

// // app.use(cors());
// app.use(cors({ origin: 'http://127.0.0.1:8080' }));
// app.use(express.json()); // For parsing JSON data

// // Import Routes
// const eventRoutes = require('./backend/routes/eventRoutes');
// const userRoutes = require('./backend/routes/userRoutes');

// // Use Routes
// app.use('/api/events', eventRoutes);
// app.use('/api/users', userRoutes);

// // Socket IO for real-time registrations
// // io.on('connection', (socket) => {
// //   console.log('A user connected');
// //   socket.on('disconnect', () => console.log('User disconnected'));
// // });

// io.on('connection', (socket) => {
//     console.log('A user connected');
//     socket.on('disconnect', () => console.log('User disconnected'));
//   });
  
// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';

import userRoutes from './routes/userRoutes.js';
import { connectDB } from './data/database.js';
import { error } from 'console';

import path from 'path'; 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://127.0.0.1:8080';
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// // Routes
// app.use('/api/events', eventRoutes);
// app.use('/api/users', userRoutes);
// app.use("/api/abcd", (req, res) => {
//   res.send("Welcome to the API");
// });

// Middleware to serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Adjusted path to go one level up

// Route for the root path to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')); // Adjusted path to go one level up
});


// Example API route for fetching events
app.get('/api/events', (req, res) => {
  // Your logic to fetch events from the database
  res.json([{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }]);
});

// Socket IO for real-time registrations
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => console.log('User disconnected'));
});

// // MongoDB Connection
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));


// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB().catch((error)=> console.log(error));

export default app;