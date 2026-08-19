import express from "express";

import { createOrder, getAllOrders, getMyOrders, verifyPayment, updateOrderStatus } from "../controllers/orderControllers.js";
import authUser from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const orderRouter = express.Router();

orderRouter.post("/create-order",authUser , createOrder);
orderRouter.post("/verify-payment",authUser ,  verifyPayment);

orderRouter.get("/my-orders", authUser, getMyOrders);

orderRouter.get("/all-orders", authUser, isAdmin, getAllOrders);

orderRouter.patch("/order/:id/status", authUser, isAdmin, updateOrderStatus);

export default orderRouter;
