import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
// import fishvideo from "./photos/fishvideo.mp4";
// Large videos are hosted on Cloudinary (too big for the repo).
// Set these in your .env / Vercel env to your uploaded video URLs.
const video1 = import.meta.env.VITE_HERO_VIDEO_URL || "";
import video2 from "./photos/turtleVideo1.mp4"; // Local fallback
// Side gallery: the small fishvideo ships in the repo; the larger one comes from Cloudinary.
const sideVideos = [import.meta.env.VITE_SIDE_VIDEO_URL1, video2].filter(Boolean);
import { FaPlay } from "react-icons/fa";
import logo from "./photos/logodesign.png";
import r1 from "./photos/review.jpeg"
import r2 from "./photos/review1.jpeg"
import r3 from "./photos/review2.jpeg"
import r4 from "./photos/review3.jpeg"
import r5 from "./photos/review4.jpeg"
import r6 from "./photos/review5.jpeg"
import r7 from "./photos/review7.jpeg"
import premiumproduct from "./photos/premiumproduct.jpeg"
import fish from "./photos/fish.jpg"
import fish2 from "./photos/fish2.jpeg"
import setup from "./photos/setup.jpeg"
import banner from "./photos/landingpage.jpeg"
import consultation from "./photos/consult.jpeg"
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
function FaqItem({ faq, index, active, setActive }) {
  const isActive = active === index;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setActive(isActive ? null : index)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
      >
        <h3 className="pr-2 text-sm font-semibold leading-6 text-[#063d3a]">
          {faq.question}
        </h3>

        {isActive ? (
          <FiMinus className="shrink-0 text-xl text-[#1e9e78]" />
        ) : (
          <FiPlus className="shrink-0 text-xl text-[#1e9e78]" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 text-sm leading-6 text-gray-600 sm:px-5">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
import {
  FaCheckCircle,
  FaQuoteLeft,
} from "react-icons/fa";
import successStoryImage from "./photos/consulationreview.jpeg";
import {
  FaUserMd,
  FaShoppingBag,
  FaBookOpen,
} from "react-icons/fa";
import { FaYoutube , FaShieldAlt, FaFish } from "react-icons/fa";
import {
  FaTruck,
  FaHeadset,
  FaLock,
} from "react-icons/fa";
import {

  FaGlobe,
} from "react-icons/fa";
const reviews = [r1, r2, r3, r4, r5, r6, r7];
const instagramPosts = [
fish,
  "https://images.unsplash.com/photo-1772718460103-4fb28ce6fc0b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  fish2,
  setup,
  "https://images.unsplash.com/photo-1759222859663-4df7dbb9761b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const faqs = [
  {
    question: "What is AquaHari?",
    answer:
      "AquaHari is an online platform providing expert consultation for aquarium fish, turtles, and aquatic pets. We help with tank setup, disease diagnosis, water quality, nutrition, filtration, breeding, and overall pet care.",
  },
  {
    question: "What services do you provide?",
    answer:
      "We provide guidance for fish health, turtle care, aquarium setup, pond setup, water parameter management, filtration, cycling, nutrition, equipment selection, and beginner to advanced aquarium guidance.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "Visit our Consultation page, choose a package, complete the booking process, and we'll contact you at your scheduled time.",
  },
  {
    question: "Is the consultation online?",
    answer:
      "Yes. Consultations are conducted online through WhatsApp, Phone Call, or Google Meet depending on the selected package.",
  },
  {
    question: "Do I need to send photos or videos?",
    answer:
      "Yes. Clear photos and videos help us understand the issue accurately and provide better recommendations.",
  },
  {
    question: "Can you diagnose fish or turtle diseases?",
    answer:
      "We provide expert guidance based on symptoms, images, and videos. However, online consultations cannot replace an in-person examination by a qualified veterinarian when required.",
  },
  {
    question: "What information should I provide before a consultation?",
    answer:
      "Please share aquarium size, water parameters (if available), filtration details, temperature, species, diet, photos, videos, and how long the issue has been occurring.",
  },
  {
    question: "Do you recommend medicines?",
    answer:
      "Yes. When appropriate, we recommend commonly used aquarium or reptile medications and explain their proper usage.",
  },
  {
    question: "Can you help with new aquarium setups?",
    answer:
      "Absolutely. We guide you through tank selection, filtration, substrate, lighting, cycling, aquascaping, stocking, and maintenance.",
  },
  {
    question: "Can you help with turtle care?",
    answer:
      "Yes. We provide guidance on habitat setup, UVB lighting, basking, diet, shell health, water quality, and disease prevention.",
  },
 
];

export default function Hero() {
  const scrollRef = useRef();
  const [active, setActive] = useState(null);
  return (
    <>
<section className="w-full bg-[#e6f7f5]">
  <img
    src={banner} // import your banner image
    alt="AquaHari Banner"
    className="w-full h-auto object-cover"
  />
</section>

<section className="w-full border-y border-[#d9ece8] bg-white py-6">
  <div className="mx-auto max-w-7xl px-5 sm:px-8">
    {/* Compact stats */}
    <div className="grid grid-cols-2 divide-x divide-y divide-[#d9ece8] overflow-hidden rounded-xl border border-[#d9ece8] bg-[#f8fffd] md:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
      {/* YouTube */}
      <div className="flex items-center gap-3 px-4 py-4">
        <FaYoutube className="shrink-0 text-xl text-red-600" />

        <div>
          <h3 className="text-lg font-bold leading-none text-[#063d3a]">
            18K+
          </h3>
          <p className="mt-1 text-[11px] leading-4 text-gray-500">
            YouTube Subscribers
          </p>
        </div>
      </div>

      {/* Instagram */}
      <div className="flex items-center gap-3 px-4 py-4">
        <FaInstagram className="shrink-0 text-xl text-pink-600" />

        <div>
          <h3 className="text-lg font-bold leading-none text-[#063d3a]">
            2K+
          </h3>
          <p className="mt-1 text-[11px] leading-4 text-gray-500">
            Instagram Followers
          </p>
        </div>
      </div>

      {/* Expert Care */}
      <div className="flex items-center gap-3 px-4 py-4">
        <FaFish className="shrink-0 text-xl text-green-600" />

        <div>
          <h3 className="text-sm font-bold leading-none text-[#063d3a]">
            Expert Care
          </h3>
          <p className="mt-1 text-[11px] leading-4 text-gray-500">
            Fish &amp; Turtle Care
          </p>
        </div>
      </div>

      {/* Trusted */}
      <div className="flex items-center gap-3 px-4 py-4">
        <FaShieldAlt className="shrink-0 text-xl text-blue-600" />

        <div>
          <h3 className="text-sm font-bold leading-none text-[#063d3a]">
            Trusted
          </h3>
          <p className="mt-1 text-[11px] leading-4 text-gray-500">
            Across India
          </p>
        </div>
      </div>

      {/* 24/7 Support */}
      <div className="flex items-center gap-3 px-4 py-4">
        <FaHeadset className="shrink-0 text-xl text-orange-600" />

        <div>
          <h3 className="text-sm font-bold leading-none text-[#063d3a]">
            24/7 Support
          </h3>
          <p className="mt-1 text-[11px] leading-4 text-gray-500">
            Always Available
          </p>
        </div>
      </div>

      {/* Global Consultation */}
      <div className="flex items-center gap-3 px-4 py-4">
        <FaGlobe className="shrink-0 text-xl text-purple-600" />

        <div>
          <h3 className="text-sm font-bold leading-none text-[#063d3a]">
            Global Care
          </h3>
          <p className="mt-1 text-[11px] leading-4 text-gray-500">
            Worldwide Consultation
          </p>
        </div>
      </div>
    </div>

    {/* Compact CTA */}
    <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <p className="text-center text-sm font-medium text-[#063d3a]">
        Need expert advice for your aquarium or turtle?
      </p>

      <Link
        to="/consultation"
        className="inline-flex items-center gap-2 rounded-full bg-[#0d6b61] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#084f49]"
      >
        <FaUserMd size={14} />
        Book Consultation
        <FaArrowRight size={14} />
      </Link>
    </div>
  </div>
</section>


{/* OUR SERVICES */}
<section className="w-full bg-gradient-to-br from-[#e6f7f5] via-[#d4f1ee] to-[#c2e9e5] pt-12 md:pt-20 pb-16 md:pb-24 px-4 md:px-6">

  {/* TOP LINE */}
  <div className="flex justify-center mb-12">
    <div className="w-40 h-[2px] bg-[#6ec1a6] rounded-full opacity-70"></div>
  </div>

  {/* HEADING */}
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center text-3xl md:text-5xl font-semibold text-[#063d3a] mb-12 md:mb-24 tracking-wide"
  >
    OUR SERVICES
  </motion.h2>

  {/* CARDS */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* ================= CONSULTATION ================= */}
    <Link to="/consultation">
      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 220 }}
        className="relative overflow-hidden rounded-3xl shadow-2xl group border-2 border-[#8ed1b2]"
      >
        <img
          src={consultation}
          alt="Consultation"
          loading="lazy"
          className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#063d3a]/90 via-[#063d3a]/40 to-transparent" />

        {/* Badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8ed1b2] text-[#063d3a] text-xs font-bold uppercase tracking-wider shadow-lg">
            <FaUserMd />
            Consultation
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div>
            <h3 className="text-white text-2xl font-semibold">
              Expert Consultation
            </h3>
            <p className="text-white/80 text-sm mt-2">
              Fish • Turtle • Aquarium Guidance
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-[#8ed1b2] flex items-center justify-center group-hover:rotate-45 transition duration-300">
            <FaArrowRight className="text-[#063d3a]" />
          </div>
        </div>
      </motion.div>
    </Link>

    {/* ================= PRODUCTS ================= */}
    <Link to="/all_products">
      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 220 }}
        className="relative overflow-hidden rounded-3xl shadow-2xl group"
      >
        <img
          src={premiumproduct}
          alt="Products"
          loading="lazy"
          className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-lg text-white text-xs font-bold uppercase tracking-wider border border-white/20">
            <FaShoppingBag />
            Products
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div>
            <h3 className="text-white text-2xl font-semibold">
              Premium Products
            </h3>
            <p className="text-white/80 text-sm mt-2">
              IAL Extracts • Aquarium Essentials
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:rotate-45 transition duration-300">
            <FaArrowRight className="text-white" />
          </div>
        </div>
      </motion.div>
    </Link>

    {/* ================= BLOGS ================= */}
    <Link to="/all_blogs">
      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 220 }}
        className="relative overflow-hidden rounded-3xl shadow-2xl group"
      >
        <img
          src={fish}
          alt="Blogs"
          loading="lazy"
          className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-lg text-white text-xs font-bold uppercase tracking-wider border border-white/20">
            <FaBookOpen />
            Blogs
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div>
            <h3 className="text-white text-2xl font-semibold">
              Fish Care Blogs
            </h3>
            <p className="text-white/80 text-sm mt-2">
              Tips • Guides • Aquatic Knowledge
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:rotate-45 transition duration-300">
            <FaArrowRight className="text-white" />
          </div>
        </div>
      </motion.div>
    </Link>

  </div>

  {/* CTA */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="flex justify-center mt-16"
  >
    <Link
      to="/consultation"
      className="group inline-flex items-center gap-3 rounded-full bg-[#0d6b61] px-10 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#084f49] hover:scale-105 transition-all duration-300"
    >
      <FaUserMd />
      Book Expert Consultation
      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  </motion.div>

</section>








    {/* GALLERY SECTION */}
    <section className="w-full py-16 md:py-28 px-4 md:px-6 bg-[#FAFAF8]">

{/* HEADER */}
<div className="max-w-6xl mx-auto mb-12">
  <h2 className="text-3xl md:text-5xl font-semibold text-[#1F212E]">
    Video Gallery
  </h2>
  <p className="text-gray-500 mt-2">
    Real aquarium work & insights
  </p>
</div>

{/* GRID */}
<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

  {/* BIG VIDEO */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative md:col-span-2 h-[400px] rounded-3xl overflow-hidden group"
  >
<video
  src={video1}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="w-full h-full object-cover"
  onMouseEnter={(e) => e.currentTarget.play()}
  onMouseLeave={(e) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }}
/>

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>

    {/* PLAY ICON */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center">
        <FaPlay className="text-[#1F212E]" />
      </div>
    </div>
  </motion.div>

  {/* SIDE VIDEOS */}
  <div className="flex flex-col gap-6">

    {sideVideos.map((vid, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.02 }}
        className="relative h-[190px] rounded-2xl overflow-hidden group"
      >
<video
  src={vid}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="w-full h-full object-cover"
  onMouseEnter={(e) => e.currentTarget.play()}
  onMouseLeave={(e) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }}
/>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>

        {/* PLAY ICON */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
            <FaPlay className="text-[#1F212E] text-sm" />
          </div>
        </div>
      </motion.div>
    ))}

  </div>

</div>

</section>




    {/* INSTAGRAM SECTION  */}
    <section className="relative py-16 md:py-28 mt-16 md:mt-28 bg-white overflow-hidden">

{/* SOFT GREEN GLOW */}
<div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#9EC07F]/20 blur-[120px] rounded-full"></div>
<div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#9EC07F]/10 blur-[120px] rounded-full"></div>

<div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center">

  {/* LEFT */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <FaInstagram className="text-3xl text-[#1F212E]" />
      <span className="text-lg font-semibold text-[#1F212E]">
        Instagram
      </span>
    </div>

    <h2 className="text-3xl md:text-5xl font-bold text-[#1F212E] mb-6 leading-tight">
      Follow us on <br />
      <span className="text-[#9EC07F]">
        @AquaHari
      </span>
    </h2>

    <p className="text-lg text-gray-500 mb-8 max-w-xl">
      Gentle pet care tips, emergency guidance & real stories —
      shared daily by our veterinarians.
    </p>

    {/* BUTTON (NATURE STYLE) */}
    <motion.a
      whileHover={{ scale: 1.05 }}
      href="https://www.instagram.com/aquahariofficial/?utm_source=ig_web_button_share_sheet"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full 
                 bg-[#1F212E] text-white font-semibold 
                 hover:bg-[#2b2e3f] transition shadow-md"
    >
      Visit Instagram <FaArrowRight />
    </motion.a>
  </motion.div>

  {/* RIGHT – POST GRID */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="rounded-3xl border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6"
  >
    <div className="grid grid-cols-3 gap-3">

      {instagramPosts.map((img, i) => (
        <div
          key={i}
          className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
        >
          {/* IMAGE */}
          <img
            src={img}
            alt={`Instagram ${i + 1}`}
            loading="lazy"
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />

          {/* GREEN OVERLAY */}
          <div className="absolute inset-0 bg-[#1F212E]/30 opacity-0 group-hover:opacity-100 transition duration-500" />

          {/* ICON */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
            <div className="bg-[#9EC07F] p-2 rounded-full shadow-md">
              <FaInstagram className="text-[#1F212E] text-lg" />
            </div>
          </div>
        </div>
      ))}

    </div>

    <p className="mt-6 text-center text-sm text-gray-500">
      Follow us for real pet care updates 🐾
    </p>
  </motion.div>

</div>
</section>

 {/* map review */}

<section className="w-full py-16 md:py-28 bg-[#FAFAF8] px-4 md:px-6">

  {/* Heading */}
  <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20">
    <h2 className="text-3xl md:text-5xl font-semibold text-[#1F212E] tracking-wide">
      AQUAHARI REVIEWS
    </h2>

    <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
      Read genuine feedback from aquarium enthusiasts and fish keepers who
      trust Aqua Hari for expert consultation, premium products, and fish care
      guidance.
    </p>
  </div>

  {/* Content */}
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

    {/* Left */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-3xl md:text-4xl font-bold text-[#1F212E] mb-8">
        Aqua Hari
      </h3>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex text-[#F8B400] text-3xl gap-1">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <span className="text-xl text-gray-600">
          5.0 Rating on Google
        </span>
      </div>

      <p className="text-lg text-gray-600 leading-9 max-w-xl">
        Thousands of aquarium lovers trust Aqua Hari for healthy fish,
        professional consultation, quality aquarium products, and practical
        fish care guidance.
      </p>

      <div className="flex flex-wrap gap-5 mt-12">

        <a
          href="https://maps.app.goo.gl/7cxZop1ET4pz3PJw9"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-full border-2 border-[#0d6b61]
                     text-[#0d6b61] font-semibold
                     hover:bg-[#0d6b61]
                     hover:text-white
                     transition"
        >
          👀 Read Reviews
        </a>

        <a
          href="https://maps.app.goo.gl/UtRQ3KLhoABxSUTDA?g_st=iw"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-full bg-[#0d6b61]
                     text-white font-semibold
                     hover:bg-[#084f49]
                     transition"
        >
          ⭐ Write a Review
        </a>

      </div>
    </motion.div>

    {/* Right */}
    <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200"
>
  <iframe
    title="Aqua Hari Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15249885.318783779!2d82.75252935!3d21.0680074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b09252ae5a054e3%3A0x19ae7f49ca7e3a9a!2sAquaHari!5e0!3m2!1sen!2sin!4v1783579970895!5m2!1sen!2sin"
    width="100%"
    height="500"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
  />
</motion.div>

  </div>

</section>


{/* FAQ */}
<section className="bg-gradient-to-b from-[#f8fffe] to-[#edf9f7] py-10 md:py-14">
  <div className="mx-auto max-w-6xl px-5">
    {/* Header */}
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold text-[#063d3a] md:text-4xl">
        Frequently Asked Questions
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
        Everything you need to know about AquaHari consultations, aquarium
        care, turtles, and aquatic pet health.
      </p>
    </div>

    {/* Two-column FAQ layout */}
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6">
      {/* Left column - first 5 */}
      <div className="space-y-3">
        {faqs.slice(0, 5).map((faq, index) => (
          <FaqItem
            key={index}
            faq={faq}
            index={index}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>

      {/* Right column - next 5 */}
      <div className="space-y-3">
        {faqs.slice(5, 10).map((faq, index) => {
          const actualIndex = index + 5;

          return (
            <FaqItem
              key={actualIndex}
              faq={faq}
              index={actualIndex}
              active={active}
              setActive={setActive}
            />
          );
        })}
      </div>
    </div>
  </div>
</section>




    <section className="w-full bg-gradient-to-b from-[#f8fffd] to-[#edf9f7] py-20">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-14">
      <span className="inline-block px-4 py-2 rounded-full bg-[#d9f4ec] text-[#0d6b61] text-sm font-semibold">
        Why Choose AquaHari?
      </span>

      <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#063d3a]">
        Shop With Confidence
      </h2>

      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        We ensure a seamless experience with trusted delivery, secure payments,
        and dedicated customer support.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Shipping */}
      <div className="group bg-white rounded-3xl p-8 border border-[#dbeee8] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="w-16 h-16 rounded-2xl bg-[#e8faf5] flex items-center justify-center mb-6">
          <FaTruck className="text-3xl text-[#0d6b61]" />
        </div>

        <h3 className="text-2xl font-semibold text-[#063d3a]">
          Pan India Shipping
        </h3>

        <p className="mt-3 text-gray-600 leading-7">
          Fast, reliable, and secure delivery to every corner of India.
        </p>
      </div>

      {/* Support */}
      <div className="group bg-white rounded-3xl p-8 border border-[#dbeee8] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="w-16 h-16 rounded-2xl bg-[#e8faf5] flex items-center justify-center mb-6">
          <FaHeadset className="text-3xl text-[#0d6b61]" />
        </div>

        <h3 className="text-2xl font-semibold text-[#063d3a]">
          Personalized Support
        </h3>

        <p className="mt-3 text-gray-600 leading-7">
          Get expert assistance before and after your purchase whenever you need it.
        </p>
      </div>

      {/* Payment */}
      <div className="group bg-white rounded-3xl p-8 border border-[#dbeee8] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="w-16 h-16 rounded-2xl bg-[#e8faf5] flex items-center justify-center mb-6">
          <FaLock className="text-3xl text-[#0d6b61]" />
        </div>

        <h3 className="text-2xl font-semibold text-[#063d3a]">
          Secure Payments
        </h3>

        <p className="mt-3 text-gray-600 leading-7">
          Your payments are protected with trusted and encrypted payment gateways.
        </p>
      </div>

    </div>

  </div>
</section>






{/* review constaltion */}
<section className="w-full bg-[#fbfbf8] px-5 py-8 sm:px-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Compact heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-center"
        >
          <div className="mx-auto mb-3 h-px w-8 bg-[#9ec07f]" />

          <h2 className="text-2xl font-medium tracking-tight text-[#1f212e] sm:text-3xl">
            Success Stories
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            A glimpse of the AquaHari consultation experience.
          </p>
        </motion.div>

        {/* Compact image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-md"
        >
          <div className="rounded-2xl border border-[#dfe8d8] bg-white p-2 shadow-[0_8px_25px_rgba(31,33,46,0.07)]">
            <div className="overflow-hidden rounded-xl bg-[#f5f7f2]">
              <img
                src={successStoryImage}
                alt="AquaHari consultation success story"
                loading="lazy"
                className="mx-auto block max-h-[330px] w-auto max-w-full object-contain"
              />
            </div>
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#dfe8d8] bg-white px-4 py-1.5 text-[11px] font-medium text-[#648d46] shadow-sm">
            AquaHari Consultation
          </div>
        </motion.div>
      </div>
    </section>




{/* REVIEW SECTION */}
<section className="w-full overflow-hidden bg-[#FAFAF8] py-8 md:py-12">
  {/* Header */}
  <div className="mx-auto mb-6 max-w-6xl px-4 md:px-6">
    <h2 className="text-2xl font-semibold text-[#1F212E] md:text-4xl">
      Trusted By Keepers 💬
    </h2>
  </div>

  {/* Reviews scroll */}
  <div className="overflow-hidden">
    <motion.div
      className="flex gap-4"
      animate={{ x: ["0%", "-100%"] }}
      transition={{
        ease: "linear",
        duration: 25,
        repeat: Infinity,
      }}
    >
      {[...reviews, ...reviews].map((img, index) => (
        <div
          key={index}
          className="min-w-[220px] overflow-hidden rounded-xl shadow-sm sm:min-w-[260px] md:min-w-[300px]"
        >
          <img
            src={img}
            alt={`Customer review ${index + 1}`}
            loading="lazy"
            className="h-[300px] w-full object-cover sm:h-[340px] md:h-[360px]"
          />
        </div>
      ))}
    </motion.div>
  </div>
</section>
    </>
  );
}