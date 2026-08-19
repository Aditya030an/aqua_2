import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProductForm from "./ProductForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";


export default function AllProducts() {
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;

  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("products")) || [];
  //   setProducts(stored);
  // }, []);

  useEffect(() => {
    fetchAllProducts();
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    try {
      const token = localStorage.getItem("aqua_token");

      const response = await axios.get(`${API_URL}/api/user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("login user:", response.data);
      setUser(response?.data?.user);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/product`);

      console.log("products:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add to Cart
  const handleAddToCart = (product) => {
    if (!localStorage.getItem("aqua_token")) {
      return navigate("/login");
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
      productId: product._id,
      name: product.name,
      price: product.selectedVariant?.price ?? product.price,
      variant: product.selectedVariant?.label ?? null,
      deliveryCharge:
        product.selectedVariant?.deliveryCharge ??
        product.baseDeliveryPrice ??
        0,
      qty: product.qty,
      image: product.images[0]?.url,
    };

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added to cart");
  };

  // ✅ Buy Now
 const handleBuyNow = (product) => {
  navigate("/BuyNow", {
    state: {
      productId: product._id,
      name: product.name,
      image: product.images[0]?.url,
      variant: product.selectedVariant,
      price: product.selectedVariant?.price ?? product.price,
      deliveryCharge:
        product.selectedVariant?.deliveryCharge ??
        product.baseDeliveryPrice ??
        0,
      qty: product.qty,
    },
  });
};

  const handleDelete = async (id) => {
    const token = localStorage.getItem("aqua_token");
    console.log("id", id);
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${API_URL}/api/product/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("response", response);
      if (response?.data?.success) {
        toast.success(response?.data?.success);
        fetchAllProducts();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Products</h2>

        {isAdmin && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-center py-20">Loading products...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg font-medium">No products available right now.</p>
          <p className="text-sm mt-1">Please check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              isAdmin={isAdmin}
              handleDelete={handleDelete}
              navigate={navigate}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              deleteLoading={deleteLoading}
            />
          ))}
        </div>
      )}

      {/* Form */}

      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          setProducts={setProducts}
          fetchAllProducts={fetchAllProducts} // 🔥 important
        />
      )}
    </div>
  );
}
