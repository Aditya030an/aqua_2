import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authUser from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// 🔥 IMPORTANT: multiple images
const upload = multer({ storage });

router.post(
  "/addProduct",
  authUser,
  isAdmin,
  upload.array("images", 10), // 👈 max 10 images
  createProduct
);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put(
  "/:id",
  authUser,
  isAdmin,
  upload.array("images", 5),
  updateProduct
);

router.delete("/deleteProduct/:id", authUser, isAdmin, deleteProduct);

export default router;