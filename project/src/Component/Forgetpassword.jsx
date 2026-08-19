import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ForgotPassword() {
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1 = enter email, 2 = otp + new password
  const [loading, setLoading] = useState(false);

  // Step 1 – request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/user/forgot-password`, {
        email,
      });
      if (data.success) {
        toast.success(data.message || "OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data.message || "Could not send OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 – verify OTP + set new password
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message || "Password reset successfully");
        navigate("/login");
      } else {
        toast.error(data.message || "Reset failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#FAFAF8] px-6 overflow-hidden">
      {/* SOFT GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#9EC07F]/20 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl
                   shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-200"
      >
        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-[#1F212E] mb-2 text-center">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-center mb-8">
          {step === 1
            ? "Enter your email and we'll send you an OTP"
            : "Enter the OTP and your new password"}
        </p>

        {/* STEP 1 – EMAIL */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#1F212E] text-white font-semibold
                         hover:bg-[#2b2e3f] transition cursor-pointer"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 – OTP + NEW PASSWORD */}
        {step === 2 && (
          <form onSubmit={handleReset} className="flex flex-col gap-5">
            <input
              type="text"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#1F212E] text-white font-semibold
                         hover:bg-[#2b2e3f] transition cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-gray-500 hover:text-[#9EC07F]"
            >
              ← Use a different email
            </button>
          </form>
        )}

        {/* BACK TO LOGIN */}
        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-[#9EC07F] hover:underline">
            Back to Login
          </a>
        </div>
      </motion.div>
    </section>
  );
}
