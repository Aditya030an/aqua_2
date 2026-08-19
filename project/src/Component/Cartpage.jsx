import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // ✅ Load the real cart written by "Add to Cart"
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const persist = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQty = (index, type) => {
    const updated = cart.map((item, i) => {
      if (i !== index) return item;
      const current = item.qty || 1;
      const next =
        type === "inc" ? current + 1 : current > 1 ? current - 1 : 1;
      return { ...item, qty: next };
    });
    persist(updated);
  };

  const removeItem = (index) => {
    persist(cart.filter((_, i) => i !== index));
  };

  const checkout = (item) => {
    navigate("/BuyNow", {
      state: {
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        variant: item.variant,
        deliveryCharge: item.deliveryCharge || 0,
        qty: item.qty || 1,
      },
    });
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  // shipping = sum of each item's delivery charge (added once per line, like checkout)
  const shipping = cart.reduce(
    (acc, item) => acc + (item.deliveryCharge || 0),
    0
  );

  return (
    <section className="w-full min-h-screen py-28 px-6 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <h2 className="text-3xl md:text-5xl font-semibold text-[#1F212E] mb-12">
          Your Cart 🛒
        </h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-start gap-4">
            <p className="text-gray-500">Your cart is empty</p>
            <button
              onClick={() => navigate("/all_products")}
              className="px-6 py-3 rounded-full bg-[#1F212E] text-white hover:bg-[#2b2e3f] transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {/* ITEMS */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl bg-gray-100"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1F212E]">
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p className="text-sm text-gray-500">
                        Variant: {item.variant}
                      </p>
                    )}
                    <p className="text-[#9EC07F]">₹{item.price}</p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQty(index, "dec")}
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>

                      <span>{item.qty || 1}</span>

                      <button
                        onClick={() => updateQty(index, "inc")}
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => checkout(item)}
                      className="text-sm px-4 py-2 rounded-full bg-[#1F212E] text-white hover:bg-[#2b2e3f] transition"
                    >
                      Buy
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
              <h3 className="text-xl font-semibold mb-4 text-[#1F212E]">
                Order Summary
              </h3>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between text-lg font-semibold text-[#1F212E] mb-6">
                <span>Total</span>
                <span>₹{subtotal + shipping}</span>
              </div>

              <button
                onClick={() => checkout(cart[0])}
                className="block w-full text-center py-3 rounded-full bg-[#1F212E] text-white
                           hover:bg-[#2b2e3f] transition"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-400 mt-3 text-center">
                Checkout processes one product at a time.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
