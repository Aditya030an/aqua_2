import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdClose, MdCloudUpload } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

export default function NewsForm({ onClose, setNews, fetchNews }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      toast.error("Please fill all fields and select an image.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);

      const token = localStorage.getItem("aqua_token");
      const { data } = await axios.post(`${API_URL}/api/news/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("News published successfully!");
        if (fetchNews) fetchNews();
        onClose();
      } else {
        toast.error(data.message || "Failed to publish news");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-[#1F212E]">
            Add News Update
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                News Title
              </label>
              <input
                type="text"
                required
                placeholder="Enter title (e.g., Exciting new product!)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#9EC07F] focus:border-transparent transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                News Content / Caption
              </label>
              <textarea
                required
                rows="4"
                placeholder="Write the full update or social media caption here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#9EC07F] focus:border-transparent transition resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition relative overflow-hidden">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                    <MdCloudUpload size={32} className="mb-2" />
                    <p className="text-sm font-medium">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setImage(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            
            <p className="text-xs text-gray-500 flex items-center">
               <span className="mr-1 text-[#9EC07F]">ℹ️</span>
               This will automatically be posted to the website, Instagram, LinkedIn, and WhatsApp (once API keys are configured).
            </p>
          </div>

          {/* FOOTER */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-[#1F212E] hover:bg-[#2b2e3f] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] transition"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              ) : (
                "Publish News"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
