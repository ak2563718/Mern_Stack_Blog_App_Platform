import express from 'express'
import { createProfile, getFullProfiledata, profilebyId, updateProfile } from '../controllers/profilecontroller.js';
import { isAdmin, isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router()
router.post('/createprofile',isAuthenticated,createProfile)
router.patch('/updateprofile',isAuthenticated,updateProfile)
router.get('/profile',isAuthenticated,profilebyId)
router.get('/user/profile',isAuthenticated,isAdmin,getFullProfiledata)
export default router;