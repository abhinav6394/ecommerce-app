import express from 'express';
import { adminLogin, loginUser, profileController, registerUser } from '../controllers/userContoller.js';
import authUser from '../middlewares/auth.js';


const userRouter = express.Router();

userRouter.post('/profile',authUser,profileController)
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;