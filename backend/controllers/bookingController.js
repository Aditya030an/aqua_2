import express from 'express';
import bookingModel from '../models/bookingModels.js';
import { sendAdminNotification } from '../utils/sendEmail.js';

const createBooking = async (req, res) => {
  try {
    // Optional: set by optionalAuth when the visitor happens to be logged in.
    // Booking is public — a guest with no account can book a consultation.
    const userId = req.user?.id || null;
    const {
      plan,
      dateTime,
      city,
      location,
      bookingType,
      name,
      phone,
      email,
      message,
    } = req.body || {};

    if (!bookingType) {
      return res
        .status(400)
        .json({ success: false, message: "bookingType is required" });
    }

    // With no login there is no account to fall back on, so the contact
    // details on the form are what the admin needs to reach the customer.
    if (!name || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Name and phone number are required" });
    }

    const newBooking = new bookingModel({
      userId,
      bookingType,
      plan,
      dateTime: dateTime || undefined,
      city,
      location,
      name,
      phone,
      email,
      message,
    });

    await newBooking.save();

    // 📧 Notify admin about the new booking / enquiry.
    // With no login required this email is the admin's primary notification,
    // so a failure is logged loudly — but it never fails the customer's booking.
    let adminNotified = false;
    try {
      const label = bookingType === "contact" ? "Enquiry" : "Consultation Booking";
      await sendAdminNotification(
        `📅 New ${label} — ${name || "Customer"}`,
        `<h2>New ${label}</h2>
         <p><strong>Type:</strong> ${bookingType}</p>
         <p><strong>Name:</strong> ${name || "-"}</p>
         <p><strong>Phone:</strong> ${phone || "-"}</p>
         <p><strong>Email:</strong> ${email || "-"}</p>
         ${plan ? `<p><strong>Plan:</strong> ${plan.title || JSON.stringify(plan)}</p>` : ""}
         ${dateTime ? `<p><strong>Preferred:</strong> ${new Date(dateTime).toLocaleString()}</p>` : ""}
         ${city ? `<p><strong>City:</strong> ${city}</p>` : ""}
         ${location ? `<p><strong>Location:</strong> ${location}</p>` : ""}
         ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
         <p><strong>Booked by:</strong> ${userId ? "Registered user" : "Guest (not logged in)"}</p>
         <p><em>${new Date().toLocaleString()}</em></p>`
      );
      adminNotified = true;
      console.log(`Admin notified of new ${bookingType} booking (${newBooking._id})`);
    } catch (mailErr) {
      console.error(
        `⚠️  Admin booking email FAILED for booking ${newBooking._id}:`,
        mailErr.message
      );
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      adminNotified,
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().populate();
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { createBooking  , getAllBookings };
