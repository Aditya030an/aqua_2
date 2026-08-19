import { motion } from "framer-motion";
import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

export default function ContactPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("aqua_user") || "null");

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    phone: storedUser?.phoneNumber || "",
    email: storedUser?.email || "",
    problem: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("aqua_token");
    if (!token) {
      toast.error("Please log in to send a request");
      return navigate("/login");
    }

    if (!form.name || !form.phone || !form.problem) {
      toast.error("Please fill name, phone and your problem");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/api/booking/createBooking`,
        {
          bookingType: "contact",
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.duration
            ? `${form.problem}\n\nDuration: ${form.duration}`
            : form.problem,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Request sent! We'll get back to you soon.");
        setForm((f) => ({ ...f, problem: "", duration: "" }));
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-28 px-4 md:px-6 bg-white overflow-hidden">

      {/* SOFT GLOW */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] max-w-full bg-[#9EC07F]/20 blur-[120px] rounded-full"></div>

      <div className="max-w-5xl mx-auto text-center">

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#1F212E] mb-6"
        >
          Contact Us
        </motion.h1>

        <p className="text-gray-500 mb-10 md:mb-16 text-base md:text-lg">
          Have questions or need guidance? We’re here to help you.
        </p>

        {/* CONTACT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10
                     shadow-[0_20px_60px_rgba(0,0,0,0.06)] max-w-xl w-full mx-auto"
        >
          <div className="flex flex-col items-center gap-5">

            {/* ICON */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#9EC07F]/20">
              <FaEnvelope className="text-[#1F212E] text-xl" />
            </div>

            {/* EMAIL */}
            <h3 className="text-xl font-semibold text-[#1F212E]">
              Email Us
            </h3>

            <a
              href="mailto:aquahariofficial@gmail.com"
              className="text-[#9EC07F] font-medium hover:underline"
            >
              aquahariofficial@gmail.com
            </a>

            <p className="text-sm text-gray-500">
              We usually respond within 24 hours.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-6 mt-4">

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/aquahariofficial/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full
                           bg-[#F5F5F5] hover:bg-[#9EC07F]/20 transition"
              >
                <FaInstagram className="text-xl text-[#1F212E]" />
              </a>

              {/* YOUTUBE */}
              <a
                href="https://youtube.com/@aquahariofficial?si=sVgwYZDylTajIyE6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full
                           bg-[#F5F5F5] hover:bg-[#9EC07F]/20 transition"
              >
                <FaYoutube className="text-xl text-[#1F212E]" />
              </a>

            </div>

          </div>
        </motion.div>

        {/* REQUEST FORM */}
        <form onSubmit={handleSubmit} className="grid gap-6 max-w-xl w-full mx-auto mt-10 text-left">

          {/* NAME */}
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />

          {/* PHONE */}
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />

          {/* PROBLEM */}
          <textarea
            name="problem"
            value={form.problem}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your problem (fish health, tank issue, etc.)"
            required
            className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          ></textarea>

          {/* DURATION */}
          <textarea
            name="duration"
            value={form.duration}
            onChange={handleChange}
            rows="2"
            placeholder="How long has this issue been happening?"
            className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          ></textarea>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-fit px-8 py-3 rounded-full bg-[#1F212E] text-white
                       hover:bg-[#2b2e3f] transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit Request"}
          </button>

        </form>

      </div>
    </section>
  );
}
