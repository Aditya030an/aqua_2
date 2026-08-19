import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import ForgotPassword from "./Component/ForgotPassword";
import Floatingbutton from "./Component/Floatingbutton"; // ✅ ADD THIS
import AllBlogs from "./Component/Blogs";
import BlogDetails from "./Component/BlogDetails";
import AllProducts from "./Component/AllProducts";
import Cart from "./Component/Cart";


const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <div className="w-full min-h-screen bg-white overflow-x-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/all_blogs" element={<AllBlogs />} />
          <Route path="/blog_details/:id" element={<BlogDetails />} />
          <Route path="/all_products" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        {/* FLOATING BUTTONS (GLOBAL) */}
        <Floatingbutton />

      </div>
    </BrowserRouter>
  );
};

export default App;