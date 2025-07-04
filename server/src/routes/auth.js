import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate
} from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updateprofile', protect, validateUserUpdate, updateProfile);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/verify/:token', verifyEmail);

export default router;