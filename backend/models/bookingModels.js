import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  // Optional — consultation bookings can be made by guests without an account.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  bookingType: {
    type: String,
    required: true, // e.g. "consultation" | "contact"
  },
  // contact details captured on the form
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  // consultation-specific (optional so a plain "contact" enquiry can save too)
  plan: { type: Object },
  dateTime: { type: Date },
  city: { type: String },
  location: { type: String },
  // free-text notes / enquiry message
  message: { type: String },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bookingModel =
  mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default bookingModel;
