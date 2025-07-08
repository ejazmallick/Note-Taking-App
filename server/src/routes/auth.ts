import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { generateOTP } from '../utils/generateOTP';
import { sendOTP } from '../utils/mailer';
import { authenticateToken } from '../middleware/auth';
import { AuthRequest } from '../types/AuthRequest'; // ✅ import this

const router = express.Router();

/**
 * POST /auth/signup
 */
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  try {
    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
    console.log('📩 Email received in signup:', email);


    await sendOTP(email, otp);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err: any) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /auth/verify
 */
router.post('/verify', async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ message: 'Email and OTP are required' });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      res.status(401).json({ message: 'Invalid OTP or email' });
      return;
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
      res.status(401).json({ message: 'OTP has expired' });
      return;
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'OTP verified', token });
  } catch (err: any) {
    console.error('❌ OTP Verify Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /auth/me — protected route
 */
router.get('/me', authenticateToken, (req: Request, res: Response): void => {
  // Map user object to expected shape if needed
  const user = (req as any).user;
  res.status(200).json({
    message: 'You are authenticated',
    user: user && user.userId && user.email
      ? { userId: user.userId, email: user.email }
      : user,
  });
});

export default router;
