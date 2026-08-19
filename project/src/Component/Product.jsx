import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductPage() {
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/product/${id}`);
        setProduct(data);
        setMainImage(data?.images?.[0]?.url || "");
      } catch (err) {
        console.error("Fetch product error:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  const handleAddToCart = () => {
    if (!localStorage.getItem("aqua_token")) {
      return navigate("/login");
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.variants?.[0]?.price ?? product.price,
      variant: product.variants?.[0]?.label ?? null,
      deliveryCharge:
        product.variants?.[0]?.deliveryCharge ??
        product.baseDeliveryPrice ??
        0,
      qty: 1,
      image: product.images?.[0]?.url,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    navigate("/BuyNow", {
      state: {
        productId: product._id,
        name: product.name,
        image: product.images?.[0]?.url,
        variant: product.variants?.[0] ?? null,
        price: product.variants?.[0]?.price ?? product.price,
        deliveryCharge:
          product.variants?.[0]?.deliveryCharge ??
          product.baseDeliveryPrice ??
          0,
        qty: 1,
      },
    });
  };

  if (loading) {
    return (
      <section className="w-full py-40 px-6 bg-white text-center text-gray-500">
        Loading product…
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="w-full py-40 px-6 bg-white text-center text-red-500">
        {error || "Product not found"}
      </section>
    );
  }

  const price = product.variants?.[0]?.price ?? product.price;
  const shipping = product.baseDeliveryPrice;

  return (
    <section className="w-full py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* LEFT – IMAGE GALLERY */}
        <div>
          {/* MAIN IMAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="rounded-3xl overflow-hidden border border-gray-200 mb-4"
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[420px] object-cover"
            />
          </motion.div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-6 gap-3">
            {product.images?.map((img, i) => (
              <img
                key={img._id || i}
                src={img.url}
                alt={`${product.name} ${i + 1}`}
                onClick={() => setMainImage(img.url)}
                className={`cursor-pointer rounded-lg h-20 w-full object-cover border ${
                  mainImage === img.url
                    ? "border-[#9EC07F]"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT – DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-semibold text-[#1F212E] mb-4">
            {product.name} 🌿🐟
          </h1>

          {/* PRICE */}
          <p className="text-2xl text-[#9EC07F] font-semibold mb-6">
            ₹{price}
          </p>

          {/* DESCRIPTION (preserves the ✔ benefit lines stored in the DB) */}
          <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
            {product.description}
          </p>

          {/* DETAILS */}
          <div className="mb-6 text-gray-600">
            {product.capacity && <p>💧 Net Volume: {product.capacity}</p>}
            {shipping != null && (
              <p>🚚 Shipping: ₹{shipping} (All India)</p>
            )}
          </div>

          {/* CTA */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleBuyNow}
              className="px-8 py-3 rounded-full bg-[#1F212E] text-white
                         hover:bg-[#2b2e3f] transition inline-block"
            >
              Order Now
            </button>

            <button
              onClick={handleAddToCart}
              className="px-8 py-3 rounded-full border border-gray-300
                         hover:bg-gray-100 transition"
            >
              Add to Cart
            </button>
          </div>

          {/* NOTE */}
          {product.availableStock === false && (
            <p className="text-sm text-red-500 mt-6">⚠ First batch limited stock</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
