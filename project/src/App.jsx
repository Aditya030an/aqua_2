import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Always visible components (Keep static)
import Navbar from "./Component/Navbar";
import Floatingbutton from "./Component/Floatingbutton";
import Footer from "./Component/Footer";
import UserProtectedRoute from "./Component/Protected/UserProtectedRoute";
import AdminProtectedRoute from "./Component/Protected/AdminProtectedRoute";

// Lazy-loaded route components
const Home = lazy(() => import("./Component/Home.jsx"));
const About = lazy(() => import("./Component/About.jsx"));
const Contact = lazy(() => import("./Component/Contact.jsx"));
const Login = lazy(() => import("./Component/login.jsx"));
const Forgetpassword = lazy(() => import("./Component/Forgetpassword.jsx"));
const Signup = lazy(() => import("./Component/Signup.jsx"));
const Product = lazy(() => import("./Component/Product.jsx"));
const AllBlogs = lazy(() => import("./Component/Blogs.jsx"));
const BlogDetails = lazy(() => import("./Component/BlogDetails.jsx"));
const BuyNow = lazy(() => import("./Component/Buynow.jsx"));
const Ordersuccessful = lazy(() => import("./Component/Ordersuccessful.jsx"));
const CancelPayment = lazy(() => import("./Cancelpayment.jsx"));
const Consultation = lazy(() => import("./Component/Consultation.jsx"));
const AllProducts = lazy(() => import("./Component/AllProducts.jsx"));
const MyOrders = lazy(() => import("./Component/MyOrders.jsx"));
const Cartpage = lazy(() => import("./Component/Cartpage.jsx"));
const TermsConditions = lazy(() => import("./Component/Terms&condition.jsx"));
const RefundPolicy = lazy(() => import("./Component/Refundpolicies.jsx"));
const PrivacyPolicy = lazy(() => import("./Component/PrivacyDoc.jsx"));
const Admin = lazy(() => import("./Component/Admin.jsx"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="w-12 h-12 border-4 border-[#1e9e78] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Routes (grows to fill space so the footer always stays at the bottom) */}
        <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgetpassword" element={<Forgetpassword />} />
          <Route path="/Cartpage" element={<Cartpage />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Consultation" element={<Consultation />} />
          <Route path="/Contact" element={<Contact />} />

          <Route path="/all_products" element={<AllProducts />} />
          <Route path="/product_details/:id" element={<Product />} />
          {/* <Route path="/Product" element={<Product />} /> */}

          <Route path="/all_blogs" element={<AllBlogs />} />
          <Route path="/blog_details/:id" element={<BlogDetails />} />
          <Route path="/BuyNow" element={<BuyNow />} />

          <Route path="/order_successful" element={<Ordersuccessful />} />
          <Route path="/CancelPayment" element={<CancelPayment />} />
          <Route path="/Terms&condition" element={<TermsConditions />} />
<Route path="/Refundpolicies" element={<RefundPolicy />} />
<Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

          {/* my order page */}
          <Route
            path="/my_order"
            element={
              <UserProtectedRoute>
                <MyOrders />
              </UserProtectedRoute>
            }
          />

          {/* ✅ ADMIN PROTECTED (example route) */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          />
        </Routes>
        </Suspense>
        </main>

        {/* FLOATING BUTTONS (GLOBAL) */}
        <Floatingbutton />

        {/* FOOTER (GLOBAL) */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
