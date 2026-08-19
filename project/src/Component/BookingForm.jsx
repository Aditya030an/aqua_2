import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

// Reusable booking modal used by the Consultation page.
// `plans` (optional) is an array of { title, price, ... } to choose from.
export default function BookingForm({
  bookingType = "consultation",
  plans = [],
  defaultPlanTitle = "",
  onClose,
}) {
  const storedUser = JSON.parse(localStorage.getItem("aqua_user") || "null");

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    phone: storedUser?.phoneNumber || "",
    email: storedUser?.email || "",
    planTitle: defaultPlanTitle,
    dateTime: "",
    city: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // No login required to book — a token is sent only if the visitor
    // happens to already be signed in, so the booking gets linked to them.
    const token = localStorage.getItem("aqua_token");

    if (!form.name || !form.phone || !form.dateTime || !form.city) {
      toast.error("Please fill name, phone, date/time and city");
      return;
    }

    const selectedPlan =
      plans.find((p) => p.title === form.planTitle) ||
      (form.planTitle ? { title: form.planTitle } : undefined);

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/api/booking/createBooking`,
        {
          bookingType,
          name: form.name,
          phone: form.phone,
          email: form.email,
          plan: selectedPlan,
          dateTime: form.dateTime,
          city: form.city,
          location: form.location,
          message: form.message,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      if (data.success) {
        toast.success("Booking request sent! We'll contact you soon.");
        onClose();
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-[#1F212E] mb-1">
          Book a Consultation
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Fill in your details and we'll reach out to confirm.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email (optional)"
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />

          {plans.length > 0 && (
            <select
              name="planTitle"
              value={form.planTitle}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#9EC07F]"
            >
              <option value="">Select a plan</option>
              {plans.map((p) => (
                <option key={p.title} value={p.title}>
                  {p.title} {p.price ? `– ${p.price}` : ""}
                </option>
              ))}
            </select>
          )}

          <label className="text-sm text-gray-500 -mb-2">
            Preferred date &amp; time
          </label>
          <input
            name="dateTime"
            type="datetime-local"
            value={form.dateTime}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />
          <textarea
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Area / Address (optional)"
            rows={2}
            className="p-3 rounded-xl border border-gray-200 resize-none focus:outline-none focus:border-[#9EC07F]"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Anything we should know? (optional)"
            rows={2}
            className="p-3 rounded-xl border border-gray-200 resize-none focus:outline-none focus:border-[#9EC07F]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#1F212E] text-white font-semibold hover:bg-[#2b2e3f] transition disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
