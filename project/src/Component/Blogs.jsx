import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEdit  , MdDelete } from "react-icons/md";
import BlogForm from "./BlogForm";
 import { API } from "../api";
import {toast} from "react-hot-toast";
import axios from "axios";

export default function AllBlogs() {
   const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
  const [showForm, setShowForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user , setUser] = useState(null);
  // const [isAdmin, setIsAdmin] = useState(false);
  
  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;;
  

useEffect(() => {
  fetchAllBlogs();
  getLoginUser();
}, []);

const getLoginUser = async () => {
  try {
    const token = localStorage.getItem("aqua_token");

    const response = await axios.get(
      `${API_URL}/api/user/getUser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("login user:", response.data);
    setUser(response?.data?.user);

  } catch (error) {
    console.error(
      "Error:",
      error.response?.data || error.message
    );
  }
};

const fetchAllBlogs = async () => {
  const res = await API.get("/blogs");
  setBlogs(res.data);
};

const handleDelete = async (id) => {
  await API.delete(`/blogs/${id}`);
  toast.success("Deleted successfully");
  fetchAllBlogs();
};

const handleEdit = (blog) => {
  setSelectedBlog(blog);
  setShowForm(true);
};


  return (
    <div className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />

      <section className="py-14 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
          >
            Insights & Articles
          </motion.h2>

          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedBlog(null);
                setShowForm(true);
              }}
              className="mt-6 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl"
            >
              + Publish Blog
            </motion.button>
          )}
        </div>

        {/* Empty state */}
        {blogs.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg font-medium">No articles published yet.</p>
            <p className="text-sm mt-1">Please check back soon.</p>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog._id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Admin Actions */}
              {isAdmin && (
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
                  >
                    <MdEdit className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
                  >
                    <MdDelete className="text-red-600" />
                  </button>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[16/10] bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 md:p-7">
                <span className="inline-block text-xs uppercase tracking-widest bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {blog.tag}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-gray-900 leading-snug">
                  {blog.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                  {blog.desc}
                </p>

                <Link
                  to={`/blog_details/${blog._id}`}
                  className="inline-flex items-center gap-2 mt-6 font-semibold text-blue-600 hover:text-indigo-600 transition"
                >
                  Read Article
                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Blog Form Modal */}
      {showForm && (
        <BlogForm
          editData={selectedBlog}
          fetchBlogs={fetchAllBlogs}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
