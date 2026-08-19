import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#A9CD86] via-[#95C372] to-[#7FAF5D] py-16">
  {/* Background Glow */}
  <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
  <div className="absolute -bottom-20 left-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-6">
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
      🔒 Legal
    </span>

    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
      Privacy Policy
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
            At <strong>AquaHari</strong>, we value your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains what information we collect, how we use it, and how
            we safeguard it when you use our website or consultation services.
          </p>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Information We Collect
            </h2>

            <p className="text-gray-700 mb-5">
              We may collect the following information:
            </p>

            <ul className="list-disc ml-6 space-y-3 text-gray-700">
              <li>Your name, email address, phone number, and billing information.</li>
              <li>
                Photos, videos, and details about your fish, turtles, or other
                aquatic pets that you voluntarily share for consultation.
              </li>
              <li>Booking and payment information.</li>
              <li>
                Basic website usage data through cookies and analytics tools.
              </li>
            </ul>
          </section>

          {/* Use of Information */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              How We Use Your Information
            </h2>

            <p className="text-gray-700 mb-5">
              Your information is used to:
            </p>

            <ul className="list-disc ml-6 space-y-3 text-gray-700">
              <li>Provide and manage consultation services.</li>
              <li>Process bookings and payments.</li>
              <li>Respond to your inquiries and customer support requests.</li>
              <li>Improve our website, services, and user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Sharing of Information
            </h2>

            <p className="text-gray-700 leading-8">
              We do <strong>not</strong> sell, rent, or trade your personal
              information.
            </p>

            <p className="mt-5 text-gray-700">
              Your information may only be shared:
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-3 text-gray-700">
              <li>
                With trusted third-party service providers (such as payment
                processors) to operate our services.
              </li>
              <li>
                With qualified exotic animal veterinarians, only with your
                consent, if a referral is required.
              </li>
              <li>
                When required by law or to protect our legal rights.
              </li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Data Security
            </h2>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <p className="text-gray-700 leading-8">
                We use reasonable administrative and technical measures to
                protect your personal information. While we strive to keep your
                data secure, no online system can guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Cookies
            </h2>

            <p className="text-gray-700 leading-8">
              Our website may use cookies to improve website functionality,
              remember your preferences, and analyze website traffic. You can
              manage or disable cookies through your browser settings.
            </p>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Data Retention
            </h2>

            <p className="text-gray-700 leading-8">
              We retain your information only for as long as necessary to
              provide our services, maintain records, comply with legal
              obligations, or resolve disputes.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Third-Party Links
            </h2>

            <p className="text-gray-700 leading-8">
              Our website may contain links to third-party websites. AquaHari is
              not responsible for the privacy practices, security, or content of
              those external websites.
            </p>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Your Rights
            </h2>

            <p className="text-gray-700 leading-8">
              Subject to applicable law, you may request access to, correction
              of, or deletion of your personal information by contacting us.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Changes to This Privacy Policy
            </h2>

            <p className="text-gray-700 leading-8">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated{" "}
              <strong>"Last Updated"</strong> date. Continued use of our website
              constitutes acceptance of the revised policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Contact Us
            </h2>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-3">
              <p>
                <strong>AquaHari</strong>
              </p>

              <p>
                🌐{" "}
                <a
                  href="https://aquahari.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://aquahari.in
                </a>
              </p>

              <p>
                📧{" "}
                <a
                  href="mailto:aquahariofficial@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  aquahariofficial@gmail.com
                </a>
              </p>

              <p>
                📱{" "}
                <a
                  href="https://wa.me/919044634523"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  +91 90446 34523
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;