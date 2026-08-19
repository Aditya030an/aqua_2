import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("aqua_token");

        const { data } = await axios.get(`${API_URL}/api/payment/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Fetch orders error:", error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, [API_URL]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders?.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-4 rounded-xl shadow"
        >
          <h3 className="font-semibold">{order.productName}</h3>
          <p>Variant: {order.variant}</p>
          <p>Qty: {order.qty}</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}