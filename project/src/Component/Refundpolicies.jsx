

import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#A9CD86] via-[#95C372] to-[#7FAF5D] py-16">
  {/* Background Glow */}
  <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
  <div className="absolute -bottom-20 left-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

  <div className="relative max-w-5xl mx-auto px-6">
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
      💳 Refund Policy
    </span>

    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
      Refund & Cancellation Policy
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
            Thank you for choosing <strong>AquaHari</strong>.
          </p>

          <p className="text-gray-700 leading-8">
            As our services involve personalized online consultations and expert
            guidance, all consultation fees are generally non-refundable once a
            booking is confirmed or the consultation has started.
          </p>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              When Refunds May Be Provided
            </h2>

            <p className="text-gray-700 mb-5">
              Refunds may be approved only under the following circumstances:
            </p>

            <ul className="list-disc ml-6 space-y-3 text-gray-700">
              <li>A duplicate payment has been made.</li>
              <li>
                Payment is successful, but the consultation cannot be provided
                due to a technical issue on AquaHari's end.
              </li>
              <li>
                AquaHari cancels the consultation and a suitable reschedule
                cannot be arranged.
              </li>
            </ul>

            <div className="mt-8 rounded-xl border border-yellow-300 bg-yellow-50 p-5">
              <p className="font-semibold text-yellow-800">
                Please note that refunds are not available once expert advice
                has been provided or the consultation has commenced.
              </p>
            </div>
          </section>

          {/* Cancellation */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Cancellations & Rescheduling
            </h2>

            <p className="text-gray-700 leading-8">
              If you need to cancel or reschedule your appointment, please
              contact us as early as possible. Rescheduling requests are subject
              to availability and approval by AquaHari.
            </p>
          </section>

          {/* Veterinary */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Veterinary Referrals
            </h2>

            <p className="text-gray-700 leading-8">
              If your pet requires advanced medical care, AquaHari may help
              connect you with qualified exotic animal veterinarians.
            </p>

            <p className="mt-4 text-gray-700 leading-8">
              Any consultation fees, cancellations, refunds, or treatment costs
              related to third-party veterinary services are governed entirely
              by the respective veterinarian's policies. AquaHari is not
              responsible for third-party billing or refund decisions.
            </p>
          </section>

          {/* Refund Timeline */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Refund Processing
            </h2>

            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <p className="text-green-800 font-semibold text-lg">
                Approved refunds will be processed to the original payment
                method within <span className="font-bold">7–10 business days</span>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Need Assistance?
            </h2>

            <p className="text-gray-700 leading-8">
              If you have any questions regarding refunds, cancellations, or
              your consultation, please contact us through the{" "}
              <span className="font-semibold">Contact</span> page on the
              AquaHari website.
            </p>

            <p className="mt-4 text-gray-700 leading-8">
              Our team will make every reasonable effort to assist you as
              quickly as possible.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;