import express from "express";

import { getUser, loginUser , registerUser  , sendLocationToAdmin, verifiedOtp, forgotPassword, resetPassword } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.post("/verifiedOtp" , verifiedOtp);
userRouter.post("/forgot-password" , forgotPassword);
userRouter.post("/reset-password" , resetPassword);

userRouter.get("/getUser",authUser , getUser);

userRouter.post("/sendLocationToAdmin", authUser, sendLocationToAdmin );

export default userRouter;