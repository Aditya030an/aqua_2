import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API } from "../api";

const BlogForm = ({ editData, fetchBlogs, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    description: "",
    content: "",
  });

  console.log("edit", editData);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData?.title,
        tag: editData?.tag,
        description: editData?.description,
        content: editData?.content,
      });
      setPreview(editData?.image_url);
      // setImage(editData?.image_url);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("tag", formData.tag);
      data.append("description", formData.description);
      data.append("content", formData.content);

      if (image) {
        data.append("image", image);
      }

      if (editData) {
        await API.put(`/blogs/${editData._id}`, data);
        toast.success("Blog updated");
      } else {
        await API.post("/blogs", data);
        toast.success("Blog created");
      }

      onClose();
    } catch (err) {
      console.log("err" , err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      fetchBlogs();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 relative shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {editData ? "Update" : "Add New"} Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Main Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-4">
              <input
                name="tag"
                placeholder="Tag"
                value={formData.tag}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <div className="border rounded-lg h-52 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">Image Preview</span>
                )}
              </div>

              <label className="block w-full border rounded-lg py-2 text-center cursor-pointer hover:bg-gray-50">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                rows="8"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-12 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading
                ? editData
                  ? "Updating..."
                  : "Submitting..."
                : editData
                  ? "Update"
                  : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
