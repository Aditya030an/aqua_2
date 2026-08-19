import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function ProductForm({
  onClose,
  setProducts,
  fetchAllProducts,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity:"",
  });

  const [variants, setVariants] = useState([
    { label: "", price: "", discount: "", deliveryCharge: "" },
  ]);

  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const MAX_IMAGES = 10;

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { label: "", price: "", discount: "", deliveryCharge: "" },
    ]);
  };

  // Handle images (NO DUPLICATES)
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prev) => {
      const existingNames = prev.map((img) => img.name);

      const filtered = newImages.filter(
        (img) => !existingNames.includes(img.name),
      );

      const updated = [...prev, ...filtered];

      if (!activeImage && updated.length > 0) {
        setActiveImage(updated[0].preview);
      }

      return updated;
    });
  };

  // Remove image
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    if (updated.length > 0) {
      setActiveImage(updated[0].preview);
    } else {
      setActiveImage(null);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least 1 image");
      return;
    }

    const validVariants = variants.filter(
  (v) => v.label && v.price
);

if (validVariants.length === 0) {
  toast.error("Add at least 1 valid variant");
  return;
}

    const token = localStorage.getItem("aqua_token");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("quantity", form.quantity);
      formData.append("variants", JSON.stringify(variants));

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      const response = await axios.post(
        `${API_URL}/api/product/addProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.success) {
        toast.success("Product added");

        fetchAllProducts();
      }

      // 🔥 refresh products

      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-6xl mx-4 rounded-2xl shadow-xl p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Add Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-4">
              {/* Main Preview */}
              <div className="h-72 border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">Image preview</span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="overflow-x-auto">
                <div className="flex gap-3">
                  {/* Upload Box */}
                  <label
                    className={`min-w-20 min-h-20 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
                      images.length >= MAX_IMAGES
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    +
                    <input
                      type="file"
                      multiple
                      disabled={images.length >= MAX_IMAGES}
                      onChange={handleImages}
                      className="hidden"
                    />
                  </label>

                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={`relative min-w-20 min-h-20 border rounded-lg overflow-hidden cursor-pointer ${
                        activeImage === img.preview
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => setActiveImage(img.preview)}
                    >
                      <img
                        src={img.preview}
                        className="w-full h-full object-cover"
                      />

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(i);
                        }}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-500">
                {images.length} / 10 images uploaded
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Product Details</h3>

              <input
                name="name"
                required
                placeholder="Product Name"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <textarea
                name="description"
                required
                placeholder="Description"
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                name="quantity"
                required
                placeholder="Quantity / psc"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <h3 className="font-semibold text-gray-700">Variants (PCS)</h3>

              {variants.map((v, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Label (e.g. 1 PCS)"
                    value={v.label}
                    onChange={(e) =>
                      handleVariantChange(i, "label", e.target.value)
                    }
                    className="border px-3 py-2 rounded-lg w-full sm:w-1/2"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    min={0}
                    value={v.price}
                    onChange={(e) =>
                      handleVariantChange(i, "price", e.target.value)
                    }
                    className="border px-3 py-2 rounded-lg w-full sm:w-1/2"
                  />
                  <input
                    type="number"
                    placeholder="Discount"
                    min={0}
                    value={v.discount}
                    onChange={(e) =>
                      handleVariantChange(i, "discount", e.target.value)
                    }
                    className="border px-3 py-2 rounded-lg w-full sm:w-1/2"
                  />
                  <input
                    type="number"
                    placeholder="deliveryCharge"
                    min={0}
                    value={v.deliveryCharge}
                    onChange={(e) =>
                      handleVariantChange(i, "deliveryCharge", e.target.value)
                    }
                    className="border px-3 py-2 rounded-lg w-full sm:w-1/2"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addVariant}
                className="text-blue-600 text-sm"
              >
                + Add Option
              </button>

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-60"
              >
                {loading ? "Uploading..." : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
