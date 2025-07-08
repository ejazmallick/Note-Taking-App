import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables early

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';

import authRoutes from './routes/auth';
import noteRoutes from './routes/note'; // ✅ Correct
import googleAuthRoutes from './auth/google'; // ✅ Google OAuth routes

const app = express();

// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'https://note-taking-app-silk-five.vercel.app',
  credentials: true, // if using cookies/sessions
}));

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Required if you're using sessions (optional for JWT-only setup)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Passport initialization
app.use(passport.initialize());
app.use(passport.session()); // optional unless you're using session-based login

// ✅ Route setup
app.use('/auth', authRoutes);        // Email/OTP Auth
app.use('/auth', googleAuthRoutes);  // Google OAuth
app.use('/notes', noteRoutes);       // Notes API

// ✅ Test route
app.get('/', (_, res) => {
  res.send('🌐 API is working!');
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

export default app;
