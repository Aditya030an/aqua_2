import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#A9CD86] via-[#95C372] to-[#7FAF5D] py-16">
  {/* Background Glow */}
  <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
  <div className="absolute -bottom-20 left-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

  <div className="relative max-w-5xl mx-auto px-6">
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
      📜 Terms & Conditions
    </span>

    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
      Terms & Conditions
    </h1>

    <div className="mt-4 flex items-center gap-3 text-white/90">
      <div className="h-2 w-2 rounded-full bg-green-300"></div>
      <p className="text-sm md:text-base">
        Last Updated:
        <span className="ml-2 font-semibold text-white">
          July 12, 2026
        </span>
      </p>
    </div>
  </div>
</section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 space-y-10">

          <p className="text-gray-700 leading-8">
            Welcome to <strong>AquaHari</strong>. These Terms & Conditions
            ("Terms") govern your access to and use of the AquaHari website,
            consultation services, and related features. By using our website
            or booking a consultation, you agree to these Terms. If you do not
            agree, please do not use our services.
          </p>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. About AquaHari
            </h2>

            <p className="text-gray-700 leading-8 mb-5">
              AquaHari is an online platform dedicated to providing expert
              guidance and consultation for aquarium fish, turtles, and other
              aquatic pets. Our services include advice on:
            </p>

            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Aquarium and turtle habitat setup</li>
              <li>Fish and turtle health guidance</li>
              <li>Water quality and water parameter management</li>
              <li>Nutrition and feeding</li>
              <li>Filtration and aquarium cycling</li>
              <li>Pond setup and maintenance</li>
              <li>Disease prevention and management</li>
              <li>Equipment recommendations</li>
              <li>General husbandry and care</li>
            </ul>

            <p className="mt-5 text-gray-700 leading-8">
              Our goal is to educate and guide pet owners so they can provide
              the best possible care for their aquatic animals.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>

            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                You are at least 18 years of age or using the website under the
                supervision of a parent or legal guardian.
              </li>
              <li>
                The information you provide is accurate and complete.
              </li>
              <li>
                You will use our services only for lawful purposes.
              </li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. Consultation Services
            </h2>

            <p className="text-gray-700 leading-8">
              AquaHari provides online consultation through WhatsApp, phone
              calls, video calls, email, or other approved communication
              methods.
            </p>

            <p className="mt-4 text-gray-700">
              Recommendations are based entirely on the information,
              photographs, videos, and documents provided by the customer.
            </p>

            <p className="mt-6 font-semibold">
              For the most accurate guidance, please provide:
            </p>

            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
              <li>Clear photographs and videos</li>
              <li>Aquarium size</li>
              <li>Water parameters (if available)</li>
              <li>Filtration details</li>
              <li>Water temperature</li>
              <li>Species information</li>
              <li>Feeding history</li>
              <li>Medical history (if applicable)</li>
            </ul>

            <p className="mt-5 text-gray-700">
              Incomplete or inaccurate information may affect the quality of the
              consultation.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Veterinary Referral & Specialist Support
            </h2>

            <p className="text-gray-700 leading-8">
              AquaHari provides educational guidance and online consultation.
              Our services are not a substitute for an in-person examination by
              a licensed veterinarian.
            </p>

            <p className="mt-4 text-gray-700 leading-8">
              Where feasible, we may help connect pet owners with qualified
              exotic animal veterinarians from our professional network.
            </p>

            <p className="mt-4 text-gray-700 leading-8">
              AquaHari does not guarantee the availability of any specific
              veterinarian, appointment, treatment outcome, or emergency
              response.
            </p>

            <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-5">
              <p className="font-semibold text-red-700">
                If your pet is experiencing a medical emergency, seek immediate
                veterinary care without delay.
              </p>
            </div>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              5. No Guaranteed Results
            </h2>

            <p className="text-gray-700 mb-5">
              Every aquarium, animal, disease, and environmental condition is
              unique.
            </p>

            <p className="text-gray-700">
              AquaHari provides evidence-based recommendations but cannot
              guarantee:
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
              <li>Recovery</li>
              <li>Cure</li>
              <li>Survival</li>
              <li>Breeding success</li>
              <li>Disease prevention</li>
              <li>Specific treatment outcomes</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              6. User Responsibilities
            </h2>

            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Provide truthful and accurate information.</li>
              <li>Share clear images and videos when requested.</li>
              <li>Follow manufacturer instructions.</li>
              <li>Maintain proper water quality.</li>
              <li>Use medicines responsibly.</li>
              <li>Monitor your animals after consultation.</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Payments</h2>

            <p className="text-gray-700 leading-8">
              All consultation fees must be paid in full before the consultation
              begins unless otherwise agreed. Prices are subject to change
              without prior notice.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              8. Cancellation & Refund Policy
            </h2>

            <p className="text-gray-700">
              Consultation fees are generally non-refundable once:
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
              <li>A booking has been confirmed.</li>
              <li>The consultation has started.</li>
              <li>Expert advice has been provided.</li>
            </ul>

            <p className="mt-5 text-gray-700">
              Refunds, where applicable, will be processed according to our
              Refund Policy and applicable law.
            </p>
          </section>

          {/* Remaining Sections */}
          {[
            {
              title: "9. Intellectual Property",
              text: "All logos, brand names, images, videos, articles, educational material, graphics, website design, and consultation documents are the intellectual property of AquaHari unless otherwise stated. No content may be copied, reproduced, modified, distributed, or used commercially without prior written permission.",
            },
            {
              title: "10. Prohibited Use",
              text: "Users may not use the website for unlawful purposes, upload malicious software, attempt unauthorized access, misrepresent their identity, interfere with website operations, or reproduce AquaHari content without permission.",
            },
            {
              title: "11. Third-Party Products & Recommendations",
              text: "Product recommendations are educational in nature and should not be interpreted as guarantees or endorsements. Users remain responsible for selecting and using products appropriately.",
            },
            {
              title: "12. Limitation of Liability",
              text: "To the fullest extent permitted by law, AquaHari shall not be liable for damages arising from the use of our website, consultation advice, medications, equipment failures, water quality issues, illness or death of animals, third-party veterinary services, or communication delays.",
            },
            {
              title: "13. Privacy",
              text: "Your use of AquaHari is also governed by our Privacy Policy. By using our services, you consent to the collection and use of your information in accordance with that policy.",
            },
            {
              title: "14. External Links",
              text: "Our website may contain links to third-party websites. AquaHari is not responsible for their content, privacy practices, security, or availability.",
            },
            {
              title: "15. Changes to These Terms",
              text: "We reserve the right to modify these Terms at any time. Continued use of AquaHari after updates constitutes acceptance of the revised Terms.",
            },
            {
              title: "16. Governing Law",
              text: "These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.",
            },
            {
              title: "17. Contact Us",
              text: "If you have questions regarding these Terms or our services, please contact us through the Contact page on the AquaHari website. We will make reasonable efforts to respond promptly.",
            },
          ].map((item) => (
            <section key={item.title}>
              <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
              <p className="text-gray-700 leading-8">{item.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;