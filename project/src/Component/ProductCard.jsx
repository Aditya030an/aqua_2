import React, { useState } from "react";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductCard({
  item,
  isAdmin,
  handleDelete,
  navigate,
  handleAddToCart,
  handleBuyNow,
  deleteLoading,
}) {
  const variants = item?.variants || [];
  const hasVariants = variants.length > 0;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? variants[0] : null,
  );
  const [qty, setQty] = useState(1);

  // Fall back to the product's flat price when it has no variants
  const displayPrice = selectedVariant?.price ?? item?.price;
  console.log("is Admin", isAdmin);

  
  return (
    <div className="group relative border rounded-2xl shadow hover:shadow-xl p-4 transition">
      {/* DELETE BUTTON */}
      {isAdmin && (
        <button
          onClick={() => handleDelete(item._id)}
          className="absolute z-50 top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          {deleteLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <MdDelete className="text-red-600" />
          )}
        </button>
      )}

      {/* IMAGE SLIDER */}
      <div className="relative">
        <img
          src={item.images[activeImage]?.url}
          className="h-52 w-full object-cover rounded-lg"
        />

        <button
          onClick={() =>
            setActiveImage(
              activeImage === 0 ? item.images.length - 1 : activeImage - 1,
            )
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded"
        >
          ‹
        </button>

        <button
          onClick={() => setActiveImage((activeImage + 1) % item.images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded"
        >
          ›
        </button>
      </div>

      {/* NAME */}
      <h3
        onClick={() => navigate(`/product_details/${item._id}`)}
        className="mt-4 font-semibold text-lg cursor-pointer hover:underline"
      >
        {item.name}
      </h3>

      {/* VARIANTS */}
      {hasVariants && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {variants.map((v) => (
            <button
              key={v._id}
              onClick={() => setSelectedVariant(v)}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedVariant?._id === v._id
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {/* PRICE */}
      <div className="mt-3">
        <span className="text-xl font-bold text-green-600">
          ₹{displayPrice}
        </span>
      </div>

      {item?.quantity && (
        <div className="flex items-center gap-2">
          <h3>Quantity / psc</h3>
          <p>{item?.quantity}</p>
        </div>
      )}

      {/* QUANTITY */}
      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
          className="px-2 border rounded"
        >
          -
        </button>

        <span>{qty}</span>

        <button onClick={() => setQty(qty + 1)} className="px-2 border rounded">
          +
        </button>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={() =>
            handleBuyNow({
              ...item,
              selectedVariant,
              qty,
            })
          }
           className="cursor-pointer flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-full bg-[#1F212E] text-white
             hover:bg-[#2b2e3f] transition"
        >
          <FaBolt />  Order Now
        </button>

        {/* <Link
          to="/BuyNow"
          className="cursor-pointer px-8 py-3 rounded-full bg-[#1F212E] text-white 
             hover:bg-[#2b2e3f] transition inline-block"
        >
          Order Now
        </Link> */}

        <button
          onClick={() =>
            handleAddToCart({
              ...item,
              selectedVariant,
              qty,
            })
          }
          className="cursor-pointer flex-1 px-6 md:px-8 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          <FaShoppingCart /> Add
        </button>
      </div>
    </div>
  );
}
