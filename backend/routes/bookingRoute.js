import express from "express";
import bookingModel from "../models/bookingModels.js";
import authUser from "../middleware/auth.js";
import optionalAuth from "../middleware/optionalAuth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  createBooking,
  getAllBookings,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();
// Route to create a new booking — public, no login required.
// optionalAuth still links the booking to a user when they happen to be logged in.
bookingRouter.post("/createBooking", optionalAuth, createBooking);

// Route to get all bookings (admin only)
bookingRouter.get("/getAllBookings" , authUser, isAdmin, getAllBookings);

export default bookingRouter;
