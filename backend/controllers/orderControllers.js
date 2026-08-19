// import crypto from "crypto";
// import Order from "../models/orderModels.js";

// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderData,
//     } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (expectedSign !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     // ✅ Save order
//     const newOrder = await Order.create({
//       ...orderData,
//       paymentId: razorpay_payment_id,
//       status: "Placed",
//     });

//     res.json({
//       success: true,
//       message: "Order placed successfully",
//       order: newOrder,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, // ₹ → paise
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);

//     res.json({
//       success: true,
//       order,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import axios from "axios";
import { getShiprocketToken } from "../config/shiprocket.js";
import { sendAdminNotification } from "../utils/sendEmail.js";

// ✅ INIT RAZORPAY
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body || {};

    if (!amount || amount < 1) {
      return res.status(400).json({
        success: false,
        message: "Amount must be at least ₹1",
      });
    }

    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    console.log("options", options);

    const order = await razorpay.orders.create(options);

    console.log("order", order);

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body || {};

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ SAVE ORDER WITH USER ID
    const newOrder = await Order.create({
      ...orderData,
      userId: req.user.id, // ✅ IMPORTANT
      paymentId: razorpay_payment_id,
      status: "Placed",
    });

    await sendToShiprocket(newOrder);

    // ✅ PUSH ORDER ID INTO USER
    await userModel.findByIdAndUpdate(req.user.id, {
      $push: { orders: newOrder._id },
    });

    // 📧 Notify admin about the new order (non-blocking)
    try {
      await sendAdminNotification(
        `🛒 New Order — ₹${newOrder.total} (${newOrder.productName})`,
        `<h2>New Order Received</h2>
         <p><strong>Product:</strong> ${newOrder.productName}${
          newOrder.variant ? ` (${newOrder.variant})` : ""
        }</p>
         <p><strong>Qty:</strong> ${newOrder.qty}</p>
         <p><strong>Total:</strong> ₹${newOrder.total}</p>
         <p><strong>Customer:</strong> ${newOrder.name} — ${newOrder.phone}</p>
         <p><strong>Address:</strong> ${newOrder.address}</p>
         <p><strong>Payment ID:</strong> ${newOrder.paymentId}</p>
         <p><em>${new Date().toLocaleString()}</em></p>`
      );
    } catch (mailErr) {
      console.log("Admin order email failed:", mailErr.message);
    }

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ALLOWED_STATUSES = [
  "Placed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

// ✅ ADMIN: update an order's status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

    // strict:false so the update also applies to older orders whose
    // documents use a `deliveryStatus` field not in the local schema.
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status, deliveryStatus: status } },
      { new: true, strict: false }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name phoneNumber")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const sendToShiprocket = async (order) => {
  try {
    const token = getShiprocketToken();

    const res = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        order_id: order._id,
        order_date: new Date(),
        pickup_location: "Primary",

        billing_customer_name: order.name,
        billing_address: order.address,
        billing_phone: order.phone,

        order_items: [
          {
            name: order.productName,
            sku: "sku_" + order.productId,
            units: order.qty,
            selling_price: order.price,
          },
        ],

        payment_method: "Prepaid",
        sub_total: order.total,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Shiprocket Order Created", res.data);
  } catch (err) {
    console.log("Shiprocket Order Error", err.message);
  }
};
