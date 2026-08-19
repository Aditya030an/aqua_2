import Razorpay from "razorpay";

// Razorpay's constructor throws when key_id is missing. Building the client at
// module scope meant a single unset env var crashed the whole serverless
// function on import (FUNCTION_INVOCATION_FAILED) — taking down every endpoint,
// including ones that have nothing to do with payments.
// Construct it lazily instead, so a missing key only fails payment requests.
let client = null;

export function getRazorpay() {
  if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
    throw new Error(
      "Razorpay is not configured — set RAZORPAY_KEY and RAZORPAY_SECRET"
    );
  }

  if (!client) {
    client = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }

  return client;
}

// Back-compat: existing code does `razorpay.orders.create(...)`. This proxy
// resolves the real client on first property access, keeping call sites unchanged.
const razorpay = new Proxy(
  {},
  {
    get(_target, prop) {
      return getRazorpay()[prop];
    },
  }
);

export default razorpay;
