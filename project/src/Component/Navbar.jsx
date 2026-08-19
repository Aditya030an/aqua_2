import React, { useEffect, useState } from "react";
import { Link, Links, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "./photos/logodesign.png";

export default function Navbar() {
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "About", path: "/About" },
     { name: "Consultation", path: "/consultation" },
    { name: "Contact Us", path: "/Contact" },
    { name: "Shop", path: "/all_products" },
    { name: "Blog", path: "/all_blogs" },
  ];

  // Re-read auth + cart on every route change and on cross-tab storage updates
  useEffect(() => {
    const syncFromStorage = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedUser = JSON.parse(localStorage.getItem("aqua_user"));
      setCartCount(cart.length);
      setUser(storedUser);
    };

    syncFromStorage();
    setMobileOpen(false); // close mobile menu on navigation
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, [location.pathname]);

  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("aqua_user");
    localStorage.removeItem("aqua_token");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-5 flex items-center justify-between">
  {/* LOGO */}
  <Link to="/" className="flex items-center gap-3 cursor-pointer group">
    <img
      src={logo}
      alt="logo"
      className="h-14 md:h-24 object-contain transition duration-300 group-hover:scale-105"
    />
  </Link>

  {/* DESKTOP MENU */}
  <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-[16px] tracking-wide">
    {/* HOME */}
    <li className="group">
      <Link
        to="/"
        className={`relative transition duration-300 ${
          location.pathname === "/"
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600"
        }`}
      >
        HOME
        <span
          className={`absolute left-0 -bottom-2 h-[2px] transition-all duration-300 ${
            location.pathname === "/"
              ? "w-full bg-blue-600"
              : "w-0 bg-blue-600 group-hover:w-full"
          }`}
        />
      </Link>
    </li>

    {/* OTHER LINKS */}
    {navItems.map((item, index) => (
      <li key={index} className="group">
        <Link
          to={item.path}
          className={`relative transition duration-300 ${
            location.pathname === item.path
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {item.name}
          <span
            className={`absolute left-0 -bottom-2 h-[2px] transition-all duration-300 ${
              location.pathname === item.path
                ? "w-full bg-blue-600"
                : "w-0 bg-blue-600 group-hover:w-full"
            }`}
          />
        </Link>
      </li>
    ))}

    {/* CART */}
    <li className="relative">
      <Link to="/Cartpage">
        <FaShoppingCart className="text-xl text-gray-700 hover:text-blue-600 transition" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-1.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </li>

    {/* USER */}
    <li className="relative">
      {user ? (
        <div>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-400">Signed in as</p>
                <p
                  className="text-sm font-medium text-gray-800 truncate"
                  title={user?.email}
                >
                  {user?.email}
                </p>
              </div>

              <Link
                to="/my_order"
                onClick={() => setShowDropdown(false)}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                My Orders
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 border-t border-gray-100 mt-1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4 ml-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
          >
            Sign Up
          </Link>
        </div>
      )}
    </li>
  </ul>

  {/* MOBILE CONTROLS */}
  <div className="flex items-center gap-5 md:hidden">
    <Link to="/Cartpage" className="relative">
      <FaShoppingCart className="text-xl text-gray-700" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-1.5 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>

    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="text-gray-700 text-2xl"
      aria-label="Toggle menu"
    >
      {mobileOpen ? <FaTimes /> : <FaBars />}
    </button>
  </div>
</div>

      {/* MOBILE MENU PANEL */}
      {mobileOpen && (
  <div className="md:hidden bg-white border-t border-gray-200 shadow-lg px-6 py-5 flex flex-col gap-4 text-[16px]">
    <Link
      to="/"
      onClick={() => setMobileOpen(false)}
      className={
        location.pathname === "/"
          ? "text-blue-600 font-semibold"
          : "text-gray-700 hover:text-blue-600 transition"
      }
    >
      HOME
    </Link>

    {navItems.map((item, index) => (
      <Link
        key={index}
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={
          location.pathname === item.path
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600 transition"
        }
      >
        {item.name}
      </Link>
    ))}

    <div className="border-t border-gray-200 pt-4">
      {user ? (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>

          <Link
            to="/my_order"
            onClick={() => setMobileOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            My Orders
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-left text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="flex-1 text-center px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setMobileOpen(false)}
            className="flex-1 text-center px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
}
