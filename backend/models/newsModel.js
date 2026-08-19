import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    postedToInstagram: {
      type: Boolean,
      default: false,
    },
    postedToLinkedIn: {
      type: Boolean,
      default: false,
    },
    postedToWhatsApp: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const newsModel = mongoose.models.news || mongoose.model("news", newsSchema);

export default newsModel;
