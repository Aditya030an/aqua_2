import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  MdDelete,
  MdInventory2,
  MdShoppingCart,
  MdPayments,
  MdEventNote,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCampaign } from "react-icons/md";
import ProductForm from "./ProductForm";
import NewsForm from "./NewsForm";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

// ---- helpers that tolerate both the old (items[]) and new (flat) order shapes ----
const orderTotal = (o) => o.totalAmount ?? o.total ?? 0;
const orderPaid = (o) =>
  o.paymentStatus === "paid" || (!!o.paymentId && o.paymentId.length > 0);
const orderStatus = (o) => o.deliveryStatus || o.status || "—";
const orderItems = (o) => {
  if (Array.isArray(o.items) && o.items.length) {
    return o.items
      .map((it) => `${it.productName} ×${it.qty}`)
      .join(", ");
  }
  return `${o.productName || "—"} ×${o.qty || 1}`;
};
const productPrice = (p) => p.variants?.[0]?.price ?? p.price ?? "—";

const STATUS_OPTIONS = [
  "Placed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("aqua_token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product`);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("products error", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/payment/all-orders`,
        authHeader
      );
      setOrders(data.orders || []);
    } catch (err) {
      console.error("orders error", err.response?.data || err.message);
      if (err.response?.status === 403) {
        toast.error("Admin access required");
      }
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/booking/getAllBookings`,
        authHeader
      );
      // newest first
      const list = (data.bookings || []).slice().sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(list);
    } catch (err) {
      console.error("bookings error", err.response?.data || err.message);
    }
  };

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/news`);
      setNews(data.news || []);
    } catch (err) {
      console.error("news error", err);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchOrders(), fetchBookings(), fetchNews()]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (orderId, status) => {
    // optimistic update
    const prev = orders;
    setOrders((os) =>
      os.map((o) =>
        o._id === orderId ? { ...o, status, deliveryStatus: status } : o
      )
    );
    try {
      const { data } = await axios.patch(
        `${API_URL}/api/payment/order/${orderId}/status`,
        { status },
        authHeader
      );
      if (data.success) {
        toast.success(`Order marked ${status}`);
      } else {
        setOrders(prev);
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      setOrders(prev);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/product/deleteProduct/${id}`,
        authHeader
      );
      if (data.success) {
        toast.success("Product deleted");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // ---- derived stats ----
  const revenue = orders.filter(orderPaid).reduce((a, o) => a + orderTotal(o), 0);
  const paidCount = orders.filter(orderPaid).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: <MdShoppingCart />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Revenue (paid)",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: <MdPayments />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Paid Orders",
      value: paidCount,
      icon: <MdPayments />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Products",
      value: products.length,
      icon: <MdInventory2 />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Bookings",
      value: bookings.length,
      icon: <MdEventNote />,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "News Updates",
      value: news.length,
      icon: <MdCampaign />,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  const TABS = [
    { key: "overview", label: "Overview" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
    { key: "bookings", label: "Bookings" },
    { key: "news", label: "News" },
  ];

  return (
    <section className="w-full min-h-screen pt-28 pb-16 px-4 md:px-8 bg-[#F6F7F9]">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1F212E]">
            Admin Panel
          </h1>
          {tab === "products" && (
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 rounded-full bg-[#1F212E] text-white hover:bg-[#2b2e3f] transition"
            >
              + Add Product
            </button>
          )}
          {tab === "news" && (
            <button
              onClick={() => setShowNewsForm(true)}
              className="px-5 py-2.5 rounded-full bg-[#1F212E] text-white hover:bg-[#2b2e3f] transition"
            >
              + Add News
            </button>
          )}
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 -mb-px border-b-2 text-sm font-medium transition ${
                tab === t.key
                  ? "border-[#9EC07F] text-[#1F212E]"
                  : "border-transparent text-gray-500 hover:text-[#1F212E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-gray-500 py-20 justify-center">
            <AiOutlineLoading3Quarters className="animate-spin" /> Loading…
          </div>
        ) : (
          <>
            {/* ---------- OVERVIEW ---------- */}
            {tab === "overview" && (
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${s.color}`}
                      >
                        {s.icon}
                      </div>
                      <p className="text-2xl font-semibold text-[#1F212E]">
                        {s.value}
                      </p>
                      <p className="text-sm text-gray-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-[#1F212E] mb-4">
                  Recent Orders
                </h3>
                <OrdersTable
                  orders={orders.slice(0, 5)}
                  onStatusChange={handleStatusChange}
                />

                <h3 className="font-semibold text-[#1F212E] mt-10 mb-4">
                  Recent Bookings
                </h3>
                <BookingsTable bookings={bookings.slice(0, 5)} />
              </div>
            )}

            {/* ---------- PRODUCTS ---------- */}
            {tab === "products" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 && (
                  <p className="text-gray-500">No products yet.</p>
                )}
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <img
                      src={p.images?.[0]?.url}
                      alt={p.name}
                      className="h-44 w-full object-cover bg-gray-100"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-[#1F212E] line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-[#9EC07F] font-semibold mt-1">
                        ₹{productPrice(p)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {p.variants?.length
                          ? `${p.variants.length} variant(s)`
                          : "No variants"}
                        {p.capacity ? ` · ${p.capacity}` : ""}
                      </p>

                      <button
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition disabled:opacity-60"
                      >
                        {deletingId === p._id ? (
                          <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                          <MdDelete />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---------- ORDERS ---------- */}
            {tab === "orders" && (
              <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
            )}

            {/* ---------- BOOKINGS ---------- */}
            {tab === "bookings" && <BookingsTable bookings={bookings} />}

            {/* ---------- NEWS ---------- */}
            {tab === "news" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.length === 0 && (
                  <p className="text-gray-500">No news updates yet.</p>
                )}
                {news.map((n) => (
                  <div
                    key={n._id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
                  >
                    {n.image?.url && (
                      <img
                        src={n.image.url}
                        alt={n.title}
                        className="h-44 w-full object-cover bg-gray-100"
                      />
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="font-semibold text-[#1F212E] mb-2">{n.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow whitespace-pre-wrap">
                        {n.content}
                      </p>
                      
                      <div className="flex gap-2 text-xs mt-auto pt-4 border-t border-gray-100">
                         <span className={`px-2 py-1 rounded-md ${n.postedToInstagram ? "bg-pink-50 text-pink-600" : "bg-gray-50 text-gray-400"}`}>IG</span>
                         <span className={`px-2 py-1 rounded-md ${n.postedToLinkedIn ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400"}`}>LI</span>
                         <span className={`px-2 py-1 rounded-md ${n.postedToWhatsApp ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"}`}>WA</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ADD PRODUCT MODAL */}
      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          setProducts={setProducts}
          fetchAllProducts={fetchProducts}
        />
      )}

      {/* ADD NEWS MODAL */}
      {showNewsForm && (
        <NewsForm
          onClose={() => setShowNewsForm(false)}
          setNews={setNews}
          fetchNews={fetchNews}
        />
      )}
    </section>
  );
}

function OrdersTable({ orders, onStatusChange }) {
  if (!orders?.length) {
    return <p className="text-gray-500">No orders yet.</p>;
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
      <table className="w-full text-sm min-w-[720px]">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-200">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Items</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Payment</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {o.createdAt
                  ? new Date(o.createdAt).toLocaleDateString("en-IN")
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="font-medium text-[#1F212E]">
                  {o.name || "—"}
                </div>
                <div className="text-xs text-gray-400">{o.phone || ""}</div>
              </td>
              <td className="px-4 py-3 max-w-[240px] text-gray-600">
                {orderItems(o)}
              </td>
              <td className="px-4 py-3 font-semibold text-[#1F212E]">
                ₹{orderTotal(o)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    orderPaid(o)
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {orderPaid(o) ? "Paid" : "Pending"}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {onStatusChange ? (
                  <StatusSelect
                    current={orderStatus(o)}
                    onChange={(status) => onStatusChange(o._id, status)}
                  />
                ) : (
                  <span className="capitalize">
                    {orderStatus(o).replace(/_/g, " ")}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusSelect({ current, onChange }) {
  const known = STATUS_OPTIONS.includes(current);
  return (
    <select
      value={known ? current : ""}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:border-[#9EC07F] cursor-pointer"
    >
      {!known && (
        <option value="" disabled>
          {current.replace(/_/g, " ")}
        </option>
      )}
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

const planTitle = (plan) => {
  if (!plan) return "—";
  if (typeof plan === "string") return plan;
  return plan.title || "—";
};

function BookingsTable({ bookings }) {
  if (!bookings?.length) {
    return <p className="text-gray-500">No bookings yet.</p>;
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
      <table className="w-full text-sm min-w-[820px]">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-200">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Plan</th>
            <th className="px-4 py-3 font-medium">Preferred</th>
            <th className="px-4 py-3 font-medium">City</th>
            <th className="px-4 py-3 font-medium">Details</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-b border-gray-100 last:border-0 align-top">
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {b.createdAt
                  ? new Date(b.createdAt).toLocaleDateString("en-IN")
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                    b.bookingType === "contact"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {b.bookingType || "—"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="font-medium text-[#1F212E]">{b.name || "—"}</div>
                <div className="text-xs text-gray-400">{b.phone || ""}</div>
                {b.email && (
                  <div className="text-xs text-gray-400 truncate max-w-[180px]">
                    {b.email}
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-gray-600">{planTitle(b.plan)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {b.dateTime ? new Date(b.dateTime).toLocaleString("en-IN") : "—"}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {b.city || "—"}
                {b.location ? (
                  <div className="text-xs text-gray-400 max-w-[160px]">
                    {b.location}
                  </div>
                ) : null}
              </td>
              <td className="px-4 py-3 max-w-[240px] text-gray-600 whitespace-pre-line break-words">
                {b.message || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
