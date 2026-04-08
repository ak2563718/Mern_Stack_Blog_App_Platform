import express from 'express'
import { checkloginstatus, deleteUser, forgotPassword, getallusers, getgoogleuser, getUserById, loginUser, logoutUser, resetpassword, signupUser, verifyotp } from '../controllers/userController.js';
import { isAdmin, isAuthenticated } from '../middlewares/authMiddleware.js';
import passport from 'passport';

const router = express.Router()
router.post('/signup',signupUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.get('/checkauthentication',isAuthenticated,checkloginstatus)
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',verifyotp)
router.post('/reset-password',resetpassword)
router.get('/google',passport.authenticate('google',{scope:['profile','email'],session:false}))
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login',session:false}),getgoogleuser)
router.get('/getallusers',isAuthenticated,isAdmin,getallusers)
router.get('/getuser/:id',isAuthenticated,isAdmin,getUserById)
router.delete('/user/delete/:id',isAuthenticated,isAdmin,deleteUser)

export default router;