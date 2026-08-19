
import { useState } from "react";
import { motion } from "framer-motion";
import { FaFish, FaLeaf, FaHeartbeat, FaWater } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import banner2 from "./photos/expertconsultation.jpeg"
import BookingForm from "./BookingForm";


const consultationServices = [
  {
    icon: <FaFish />,
    title: "Aquarium Consultation 🐠",
    items: [
      "Complete tank setup & planning",
      "Fish compatibility & stocking",
      "Water parameters & quality",
      "Filtration & equipment selection",
      "Aquascaping & maintenance",
    ],
  },
  {
    icon: <FaLeaf />,
    title: "Reptile Consultation 🦎",
    items: [
      "Enclosure setup & equipment",
      "Temperature & humidity management",
      "Species-specific diet planning",
      "Lighting & UVB guidance",
      "Behavior & general care",
    ],
  },
  {
    icon: <FaHeartbeat />,
    title: "Health & Treatment Guidance 🏥",
    items: [
      "Disease & health assessment",
      "Diagnosis & treatment planning",
      "Medication & dosage guidance",
      "Emergency care guidance",
      "Preventive healthcare",
    ],
  },
  {
    icon: <FaWater />,
    title: "Water Parameters & Environment 💧",
    items: [
      "pH & water quality guidance",
      "Ammonia, nitrite & nitrate",
      "Temperature optimization",
      "Aquarium cycling guidance",
      "Long-term water management",
    ],
  },
];

const steps = [
    "Contact via WhatsApp / Form",
    "Share your tank/reptile details",
    "Get expert guidance",
    "Follow plan & improve results",
  ];
  const plans = [
    {
      title: "Basic Consultation",
      price: "₹199",
      desc: "Essential guidance for common aquarium and reptile care needs",
      features: [
        "Basic Issue Assessment",
        "Habitat & Care Guidance",
        "Diet Recommendations",
        "Water & Temperature Guidance",
        "7 Follow-Ups Included",
      ],
    },
    {
      title: "Advanced Consultation",
      price: "₹399",
      desc: "Detailed diagnosis and personalized treatment support",
      features: [
        "Detailed Diagnosis",
        "Disease & Issue Assessment",
        "Step-by-Step Treatment Plan",
        "Tank & Environment Guidance",
        "30-Day Follow-Up Support",
      ],
      highlight: true,
    },
    {
      title: "Full Setup & Long-Term Care",
      price: "₹599",
      desc: "Complete setup planning with long-term care guidance",
      features: [
        "Complete Setup Planning",
        "Detailed Health & Treatment Plan",
        "Medication & Dosage Guidance",
        "Diet & Maintenance Plan",
        "12-Month Follow-Up Support",
      ],
    },
  ];
  const points = [
    "12+ Years of Practical Experience",
    " 5-Star Rated on Google Maps",
    " Trusted by Thousands of Aquarium & Reptile Hobbyists Across India",
    " 18,000+ Subscribers on YouTube",
    " 2,000+ Instagram Community",
    " Personalized Solutions for Every Client",
    " Expert Guidance for Aquariums & Exotic Pets",
    " Practical, Experience-Based Recommendations",
    " Support from Qualified Exotic Veterinarians Whenever Required",
    " Dedicated Follow-Up Support According to Your Consultation Plan",
  ];
export default function Consultation() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState("");

  const openBooking = (planTitle = "") => {
    setSelectedPlanTitle(planTitle);
    setShowBooking(true);
  };

  return (
    <section className="w-full min-h-screen py-16 md:py-28 px-4 md:px-6 bg-[#FAFAF8]">

      <div className="max-w-5xl mx-auto text-center mb-10 md:mb-16">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#1F212E] mb-6"
        >
          Aquatic & Reptile Expert Consultation
        </motion.h1>

        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Get 1-on-1 professional guidance for fish care, turtle health,
          aquarium setup, and problem solving — directly from an experienced expert.
        </p>
      </div>

      <section className="w-full bg-white px-5 py-20 md:px-8 md:py-28">
  <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-14 md:gap-20 items-center">

    {/* LEFT — CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-xl"
    >
      <span className="mb-5 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#9EC07F] font-semibold">
        <span className="h-px w-8 bg-[#9EC07F]" />
        Expert Aquatic Care
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-[-0.03em] text-[#1F212E] leading-[1.08] mb-7">
        Confused about your
        <span className="block text-[#9EC07F]">
          aquarium setup?
        </span>
      </h2>

      <p className="text-[#5F626B] text-base md:text-lg leading-relaxed mb-5 max-w-lg">
        Get expert guidance from an experienced aquatic specialist with{" "}
        <span className="text-[#1F212E] font-medium">
          12+ years of hands-on experience
        </span>.
      </p>

      <p className="text-[#777982] text-base leading-relaxed max-w-lg">
        From beginners to advanced hobbyists — get practical,
        personalized solutions tailored specifically to your setup,
        fish, and aquatic environment.
      </p>

      {/* CTA + experience */}
      <div className="mt-9 flex items-center gap-6">
        <button
          onClick={() => openBooking()}
          className="group inline-flex items-center gap-4 rounded-full bg-[#1F212E] pl-7 pr-3 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2b2e3f]"
        >
          Get Expert Help

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9EC07F] text-[#1F212E] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        <div className="hidden sm:block">
          <p className="text-2xl font-semibold text-[#1F212E] leading-none">
            12+
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-gray-400">
            Years Experience
          </p>
        </div>
      </div>
    </motion.div>


    {/* RIGHT — EDITORIAL IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative flex justify-center md:justify-end"
    >

      {/* Soft background shape */}
      <div className="absolute -right-5 -top-5 h-72 w-72 rounded-full bg-[#9EC07F]/10 blur-3xl" />

      {/* Decorative line */}
      <div className="absolute -right-3 top-8 hidden md:block h-32 w-px bg-[#9EC07F]/40" />

      {/* IMAGE WRAPPER */}
      <div className="relative w-[82%] sm:w-[70%] md:w-[78%]">

        {/* Image */}
        <div className="relative overflow-hidden rounded-[5rem_1.5rem_5rem_1.5rem]">
  <img
    src={banner2}
    alt="Aquarium expert care"
    className="w-full h-full object-contain
               transition-transform duration-700
               hover:scale-[1.03]"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-[#1F212E]/20 via-transparent to-transparent" />
</div>

        {/* Floating experience card */}
        <div className="absolute -bottom-5 -left-7 sm:-left-10 bg-white/95 backdrop-blur-md
                        px-5 py-4 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.10)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9EC07F]/20">
              <span className="text-[#718d58] text-lg">✦</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1F212E]">
                12+ Years
              </p>
              <p className="text-[11px] text-gray-400">
                Hands-on Experience
              </p>
            </div>
          </div>
        </div>

        {/* Small floating accent */}
        <div className="absolute -right-5 bottom-16 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-[#1F212E] text-white shadow-xl">
          ↗
        </div>
      </div>
    </motion.div>

  </div>
</section>


{/* kjoijoijoijojoijoi */}
<section className="w-full bg-[#FAFAF8] px-5 py-20 md:px-8 md:py-28">
  {/* Header */}
  <div className="mx-auto mb-12 max-w-6xl md:mb-16">
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

      <div>
        <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#82A65F]">
          <span className="h-px w-7 bg-[#9EC07F]" />
          What We Offer
        </span>

        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#1F212E] sm:text-4xl md:text-5xl">
          Expert care for every
          <span className="text-[#9EC07F]"> aquatic need.</span>
        </h2>
      </div>

      <p className="max-w-sm text-sm leading-6 text-[#777982] md:text-right md:text-base">
        Practical guidance designed around your aquarium,
        aquatic pets, reptiles, and their environment.
      </p>
    </div>
  </div>

  {/* Services */}
  <div className="mx-auto max-w-6xl border-t border-[#DCDDD7]">
    {consultationServices.map((service, index) => (
      <motion.div
        key={service.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="group grid grid-cols-[42px_1fr] gap-5 border-b border-[#DCDDD7] py-7 md:grid-cols-[70px_1fr_auto] md:items-center md:gap-8 md:py-8"
      >
        {/* Number */}
        <span className="pt-1 text-xs font-medium tracking-widest text-[#A6A7A0]">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Main content */}
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF5E8] text-lg text-[#82AA5F] transition-all duration-300 group-hover:bg-[#9EC07F] group-hover:text-[#1F212E]">
              {service.icon}
            </div>

            <h3 className="text-lg font-semibold tracking-[-0.01em] text-[#1F212E] md:text-xl">
              {service.title}
            </h3>
          </div>

          {/* Items */}
          <div className="mt-4 grid gap-2 pl-14 sm:grid-cols-2 md:mt-3 md:grid-cols-3 md:gap-x-8">
            {service.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm leading-5 text-[#777982]"
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#9EC07F]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#DCDDD7] text-[#777982] transition-all duration-300 group-hover:border-[#9EC07F] group-hover:bg-[#9EC07F] group-hover:text-[#1F212E] md:flex">
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            ↗
          </span>
        </div>
      </motion.div>
    ))}
  </div>
</section>



    <section className="w-full bg-white px-4 py-16 md:px-6 md:py-24">
  <div className="mx-auto max-w-6xl">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
    >
      <span className="inline-flex items-center rounded-full bg-[#eef5e8] px-4 py-2 text-sm font-semibold text-[#648d46]">
        Why AquaHari?
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#1F212E] sm:text-4xl md:text-5xl">
        Why Choose AquaHari?
      </h2>

      <p className="mt-4 text-base leading-7 text-gray-500 md:text-lg">
        Trusted, practical, and personalized care for aquariums, reptiles, and
        exotic pets.
      </p>
    </motion.div>

    {/* Points */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {points.map((item, index) => {
        const cleanText = item.replace("✅ ", "");

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
            whileHover={{ y: -5 }}
            className="group rounded-2xl border border-gray-200 bg-[#FAFAF8] p-5 transition-all duration-300 hover:border-[#b7d39b] hover:bg-white hover:shadow-lg md:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf3e2] text-[#7ca85c] transition duration-300 group-hover:bg-[#9EC07F] group-hover:text-white">
                <FaCheckCircle className="text-lg" />
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest text-[#9EC07F]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-1 text-sm font-semibold leading-6 text-[#1F212E] md:text-base">
                  {cleanText}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Bottom trust message */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#dbe8d1] bg-[#f5faef] px-6 py-5 text-center"
    >
      <p className="text-sm font-medium leading-6 text-[#52733c] md:text-base">
        Your pets deserve knowledgeable care, practical solutions, and
        continued support at every stage.
      </p>
    </motion.div>
  </div>
</section>


{/* Pricing */}
    <section className="w-full py-16 md:py-28 px-4 md:px-6 bg-[#FAFAF8]">

{/* HEADER */}
<div className="max-w-5xl mx-auto text-center mb-10 md:mb-16">
  <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[#1F212E] mb-4">
    Pricing Plans 
  </h2>
  <p className="text-gray-500 text-base md:text-lg">
    Choose the right consultation based on your needs
  </p>
</div>

{/* GRID */}
<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">

  {plans.map((plan, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -8 }}
      className={`p-6 md:p-8 rounded-3xl border shadow-sm flex flex-col justify-between
        ${
          plan.highlight
            ? "bg-[#1F212E] text-white border-none scale-105"
            : "bg-white border-gray-200"
        }`}
    >

      {/* TITLE */}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          {plan.title}
        </h3>

        <p className="text-3xl font-bold mb-2">
          {plan.price}
        </p>

        <p className={`mb-6 ${
          plan.highlight ? "text-gray-300" : "text-gray-500"
        }`}>
          {plan.desc}
        </p>

        {/* FEATURES */}
        <ul className="space-y-2 mb-8 text-sm">
          {plan.features.map((f, idx) => (
            <li key={idx}>✔ {f}</li>
          ))}
        </ul>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => openBooking(plan.title)}
        className={`w-full py-3 rounded-full font-semibold transition
          ${
            plan.highlight
              ? "bg-white text-[#1F212E] hover:bg-gray-200"
              : "bg-[#1F212E] text-white hover:bg-[#2b2e3f]"
          }`}
      >
        Book Now
      </button>

    </motion.div>
  ))}

</div>

{/* EXTRA NOTE */}
<div className="text-center mt-10 md:mt-16 text-gray-600">
  <p>💡 Free basic advice available for quick help</p>
  <p>Upgrade anytime for detailed consultation plans</p>
</div>

</section>


<section className="relative overflow-hidden bg-white px-4 py-12 md:px-6 md:py-16">
  {/* Background glow */}
  <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#cbaa69]/10 blur-3xl" />
  <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#9ec07f]/10 blur-3xl" />

  <div className="relative mx-auto max-w-6xl">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-2xl text-center"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08b4f]">
        Your Care Journey
      </span>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#10231f] sm:text-4xl">
        How It Works <span className="text-[#b08b4f]">⚡</span>
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#66736d] md:text-base">
        Simple, personal, and expert care from your first consultation.
      </p>
    </motion.div>

    {/* Steps */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-3">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: index * 0.1,
          }}
          whileHover={{ y: -6 }}
          className="group relative rounded-2xl border border-[#10231f]/10 bg-[#fafaf7] p-5 shadow-sm transition-all duration-300 hover:border-[#cbaa69]/60 hover:bg-white hover:shadow-lg"
        >
          {/* Step number */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b08b4f]">
              Step {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b08b4f]/60 text-sm font-semibold text-[#b08b4f] transition-all duration-300 group-hover:bg-[#b08b4f] group-hover:text-white">
              {index + 1}
            </div>
          </div>

          {/* Step content */}
          <p className="text-sm font-medium leading-6 text-[#10231f]">
            {step}
          </p>

          {/* Bottom accent */}
          <div className="mt-5 h-px w-8 bg-[#cbaa69] transition-all duration-300 group-hover:w-full" />
        </motion.div>
      ))}
    </div>
  </div>
</section>


<section className="w-full py-16 md:py-28 px-4 md:px-6 bg-[#FAFAF8] relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute -top-24 right-20 w-72 h-72 bg-[#9EC07F]/20 blur-[100px] rounded-full"></div>
  <div className="absolute -bottom-24 left-20 w-72 h-72 bg-[#d9ece8] blur-[100px] rounded-full"></div>

  <div className="max-w-5xl mx-auto relative z-10">

    <div className="bg-white border border-[#d9ece8] rounded-[32px] p-10 md:p-16 shadow-sm text-center">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-semibold text-[#1F212E] leading-tight"
      >
        Start Your Aquarium Consultation
      </motion.h2>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mt-5 max-w-2xl mx-auto">
        Whether you're setting up a new aquarium or upgrading an existing one,
        get expert guidance tailored to your needs.
      </p>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={openBooking}
        className="mt-10 px-10 py-4 rounded-full bg-[#1F212E] text-white font-medium hover:bg-[#2e3143] transition-all duration-300 shadow-lg"
      >
        Book a Consultation →
      </motion.button>

    </div>

  </div>

</section>

    {showBooking && (
      <BookingForm
        bookingType="consultation"
        plans={plans}
        defaultPlanTitle={selectedPlanTitle}
        onClose={() => setShowBooking(false)}
      />
    )}

    </section>
  );
}