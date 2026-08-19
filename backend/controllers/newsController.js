import News from "../models/newsModel.js";
import { broadcastNews } from "../utils/socialMediaPoster.js";

export const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "An image is required for the news update",
      });
    }

    const image = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    // 1. Create the News entry in the database
    const news = await News.create({
      title,
      content,
      image,
    });

    // 2. Trigger asynchronous social media posting
    // We don't await this completely so the admin gets a fast response, 
    // but in a production environment you might want to use a job queue like Bull.
    broadcastNews(title, content, image.url).then(async (status) => {
      // Update the news entry with the success status of the social posts
      news.postedToInstagram = status.postedToInstagram;
      news.postedToLinkedIn = status.postedToLinkedIn;
      news.postedToWhatsApp = status.postedToWhatsApp;
      await news.save();
    }).catch(console.error);

    res.status(201).json({
      success: true,
      message: "News created and is being broadcasted to social media.",
      news,
    });

  } catch (err) {
    console.error("CREATE NEWS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export const getNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json({ success: true, news: newsList });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
