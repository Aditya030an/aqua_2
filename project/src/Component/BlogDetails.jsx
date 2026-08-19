import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import blogData from "./blogData.js";
  import { API } from "../api";
import { motion } from "framer-motion";

export default function BlogDetails() {
  const { id } = useParams();

  const [blog , setBlog] = useState(null);

useEffect(() => {
  const fetchBlog = async () => {
    const res = await API.get(`/blogs/${id}`);
    setBlog(res.data);
  };

  fetchBlog();
}, [id]);


  if (!blog) return <h2 className="text-center py-20">Blog not found</h2>;

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto font-[lato]">
      <Link
        to="/all_blogs"
        className="text-blue-600 font-semibold hover:underline"
      >
        ← Back to Blogs
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mt-6"
      >
        {blog?.title}
      </motion.h1>

      <p className="mt-2 text-blue-600 font-medium">{blog?.tag}</p>

      <img
        src={blog?.image_url}
        className="w-full max-w-full rounded-2xl shadow-lg my-6 md:my-8"
        alt={blog?.title}
      />

      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-base md:text-lg">
        {blog?.content}
      </p>
    </section>
  );
}