import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { createNews, getNews } from "../controllers/newsController.js";
import authUser from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();
const upload = multer({ storage });

router.post(
  "/add",
  authUser,
  isAdmin,
  upload.single("image"), // Only one image for news
  createNews
);

router.get("/", getNews);

export default router;
