import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderSuccess from "./Ordersuccessful";

// Load the Razorpay checkout script on demand (only when the user pays),
// instead of loading it on every page. Resolves true once it's ready.
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function BuyNow() {
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: product?.qty || 1,
  });

  const [paymentLoading, setPaymentLoading] = useState(false);

  // ✅ Prefill name/phone from the logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("aqua_user"));

    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phoneNumber || "",
      }));
    }
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Price / variant with safe fallbacks (products may have no variants)
  const unitPrice = product?.variant?.price ?? product?.price ?? 0;
  const deliveryCharge =
    product?.variant?.deliveryCharge ??
    product?.deliveryCharge ??
    product?.baseDeliveryPrice ??
    0;
  const variantLabel =
    product?.variant?.label ??
    (typeof product?.variant === "string" ? product.variant : "");

  // ✅ Total Price
  const total = unitPrice * form.quantity + deliveryCharge;

  const handlePayment = async () => {
    const finalAddress = form.address.trim();

    if (!form.name || !form.phone) {
      alert("Please fill name and phone");
      return;
    }

    if (!finalAddress) {
      alert("Please enter your delivery address");
      return;
    }
    setPaymentLoading(true);
    const token = localStorage.getItem("aqua_token");
    try {
      // 1️⃣ Create order
      const { data } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: total,
          // amount: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const order = data.order;

      console.log("order in ford", order);

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Aquahari",
        description: "Order Payment",

        order_id: order.id,

        handler: async function (response) {
          // 3️⃣ Verify payment
          const verifyRes = await axios.post(
            `${API_URL}/api/payment/verify-payment`,
            {
              ...response,
              orderData: {
                name: form.name,
                phone: form.phone,
                address: form.address.trim(),

                productId: product.productId,
                productName: product.name,

                variant: variantLabel,
                price: unitPrice,
                qty: form.quantity,
                total: total,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (verifyRes.data.success) {
            navigate("/order_successful");
            alert("Order placed successfully 🎉");
          }
        },

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        theme: {
          color: "#1F212E",
        },
      };

      const razorpayReady = await loadRazorpay();
      if (!razorpayReady) {
        alert("Payment gateway failed to load. Please try again.");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("error", err);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (!product) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAFAF8] px-6 text-center">
        <p className="text-gray-500">No product selected for checkout.</p>
        <button
          onClick={() => navigate("/all_products")}
          className="px-6 py-3 rounded-full bg-[#1F212E] text-white hover:bg-[#2b2e3f] transition"
        >
          Browse Products
        </button>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen py-28 px-6 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        {/* LEFT – PRODUCT */}
        <motion.div className="bg-white p-6 rounded-3xl border shadow-sm">
          <img
            src={product?.image}
            className="w-full h-[250px] object-cover rounded-xl mb-4"
          />

          <h2 className="text-xl font-semibold">{product?.name}</h2>

          {variantLabel && (
            <p className="text-gray-600 mt-2">Variant: {variantLabel}</p>
          )}

          <p className="text-[#9EC07F] font-semibold text-lg">
            ₹{unitPrice} × {form.quantity}
          </p>

          <p className="text-gray-500 text-sm">Delivery: ₹{deliveryCharge}</p>

          <p className="mt-3 font-bold text-lg">Total: ₹{total}</p>
        </motion.div>

        {/* RIGHT – FORM */}
        <motion.div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Enter Details</h2>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Full Name"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            {/* DELIVERY ADDRESS */}
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              required
              className="p-4 border rounded-xl resize-none"
            />

            {/* QUANTITY */}
            <label className="text-sm text-gray-500 -mb-3">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            {/* ORDER BUTTON */}
            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              className="w-full py-3 rounded-full bg-black text-white cursor-pointer"
            >
              {paymentLoading ? "Paying...." : "Pay & Order"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
