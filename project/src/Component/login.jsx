import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function Login() {
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [resendOtp, setReSendOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);

  const handleSubmit = async (e) => {
    let value = "login";
    console.log("inside frontend", email);
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, {
        email,
        value,
        password,
      });
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setVerifyOtp(true);
        setReSendOtp(false);

        const expiresAt = new Date(response.data.otpExpires);
        const now = new Date();
        const secondsLeft = Math.floor((expiresAt - now) / 1000);

        setTimer(secondsLeft > 0 ? secondsLeft : 0);
        setCountdownActive(true);
      } else {
        toast.error(response.data.message);
        setEmail("");
        setPassword("");
        setOtp("");
      }
    } catch (error) {
      if (error.response) {
        console.log("Login error:", error.response.data.message);
        toast.error(error.response.data.message); // show user-friendly message
      } else {
        console.log("Something went wrong:", error.message);
      }
    }
    setLoader(false);
  };
  const handleVerifiedOtp = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${API_URL}/api/user/verifiedOtp`, {
        email,
        otp,
      });
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("aqua_token", response.data.token);
        localStorage.setItem("aqua_user", JSON.stringify(response.data.user));
        if (response.data.success && response?.data?.role === "employee") {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              await axios.post(
                `${API_URL}/api/user/sendLocationToAdmin`,
                {
                  email,
                  latitude,
                  longitude,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("aqua_token")}`,
                  },
                },
              );
            },
            (error) => {
              console.log(error);
              toast.error("Location fetch failed");
            },
          );
        }
        navigate("/");
        setVerifyOtp(false);
      } else {
        setReSendOtp(true);
        setVerifyOtp(false);
        setOtp("");
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setReSendOtp(true);
        setVerifyOtp(false);
        setOtp("");
        console.log("Login error:", error.response.data.message);
        toast.error(error.response.data.message); // show user-friendly message
      } else {
        console.log("Something went wrong:", error.message);
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    let interval;
    if (countdownActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer <= 0 && countdownActive) {
      setCountdownActive(false);
      setReSendOtp(true);
    }

    return () => clearInterval(interval);
  }, [countdownActive, timer]);

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
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">Login to your account</p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* EMAIL */}
          <input
            type="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setVerifyOtp(false);
            }}
            placeholder="Email Address"
            className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          />

          {/* PASSWORD */}
          {/* <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
          /> */}

          {!verifyOtp && (
            <div className="group relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setVerifyOtp(false);
                }}
                required
                placeholder="Password"
                className="p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#9EC07F]"
              />

              {/* Show/Hide Icon */}
              <button
                type="button"
                className="absolute right-4 top-9 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          )}

          {/* OTP Input */}
          {verifyOtp && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-sm">OTP</label>
                <input
                  type="text"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full p-4 rounded-xl border border-gray-200 tracking-[0.3em] text-center text-lg text-[#1F212E] placeholder:tracking-normal placeholder:text-base focus:outline-none focus:border-[#9EC07F]"
                />
              </div>

              <p className="text-center text-sm text-gray-500 mt-1">
                OTP expires in:{" "}
                <span className="text-red-500 font-semibold">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>
              </p>
            </>
          )}


          {/* BUTTON */}
          {/* <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#1F212E] text-white font-semibold 
                       hover:bg-[#2b2e3f] transition"
          >
            Login
          </button> */}

          {verifyOtp ? (
            <button
              type="button"
              onClick={handleVerifiedOtp}
              disabled={loader}
              className="w-full py-3 rounded-full bg-[#1F212E] text-white font-semibold 
                       hover:bg-[#2b2e3f] transition cursor-pointer"
            >
              {loader ? "Verifying..." : "Verify OTP"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loader}
              className="w-full py-3 rounded-full bg-[#1F212E] text-white font-semibold 
                       hover:bg-[#2b2e3f] transition cursor-pointer"
            >
              {loader ? "Loading..." : resendOtp ? "Resend OTP" : "Login"}
            </button>
          )}
        </form>

        {/* EXTRA LINKS */}
        <div className="flex justify-between mt-6 text-sm text-gray-500">
          {!verifyOtp && (
            <a href="/Forgetpassword" className="hover:text-[#9EC07F]">
              Forgot Password?
            </a>
          )}

          <a href="/Signup" className="hover:text-[#9EC07F]">
            Sign Up
          </a>
        </div>
      </motion.div>
    </section>
  );
}
