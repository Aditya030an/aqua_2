/**
 * Utility to automatically post news to social media platforms.
 * NOTE: This uses placeholder Environment Variables that the client must provide later.
 */

const postToInstagram = async (caption, imageUrl) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const igAccountId = process.env.INSTAGRAM_ACCOUNT_ID;

    if (!accessToken || !igAccountId) {
      console.warn("Instagram posting skipped: Missing API keys in .env");
      return false;
    }

    // 1. Create media container
    const containerRes = await fetch(
      `https://graph.facebook.com/v19.0/${igAccountId}/media?image_url=${encodeURIComponent(
        imageUrl
      )}&caption=${encodeURIComponent(caption)}&access_token=${accessToken}`,
      { method: "POST" }
    );
    const containerData = await containerRes.json();
    if (containerData.error) throw new Error(containerData.error.message);

    // 2. Publish container
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${igAccountId}/media_publish?creation_id=${containerData.id}&access_token=${accessToken}`,
      { method: "POST" }
    );
    const publishData = await publishRes.json();
    if (publishData.error) throw new Error(publishData.error.message);

    console.log("Successfully posted to Instagram:", publishData.id);
    return true;
  } catch (error) {
    console.error("Error posting to Instagram:", error.message);
    return false;
  }
};

const postToLinkedIn = async (text, imageUrl) => {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const authorId = process.env.LINKEDIN_AUTHOR_ID; // e.g., urn:li:person:XXXXX or urn:li:organization:XXXXX

    if (!accessToken || !authorId) {
      console.warn("LinkedIn posting skipped: Missing API keys in .env");
      return false;
    }

    const payload = {
      author: authorId,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "IMAGE",
          media: [
            {
              status: "READY",
              description: { text: "News Update" },
              originalUrl: imageUrl,
            },
          ],
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    };

    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.status && data.status >= 400) throw new Error(data.message);

    console.log("Successfully posted to LinkedIn:", data.id);
    return true;
  } catch (error) {
    console.error("Error posting to LinkedIn:", error.message);
    return false;
  }
};

const postToWhatsApp = async (text, imageUrl) => {
  try {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipientList = process.env.WHATSAPP_RECIPIENT_NUMBERS?.split(",") || []; // Comma separated list of opted-in numbers

    if (!accessToken || !phoneNumberId || recipientList.length === 0) {
      console.warn("WhatsApp posting skipped: Missing API keys or recipient list in .env");
      return false;
    }

    let success = true;

    for (const recipient of recipientList) {
      const payload = {
        messaging_product: "whatsapp",
        to: recipient.trim(),
        type: "image",
        image: {
          link: imageUrl,
          caption: text,
        },
      };

      const res = await fetch(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data.error) {
        console.error(`WhatsApp error for ${recipient}:`, data.error.message);
        success = false;
      }
    }

    if (success) console.log("Successfully sent WhatsApp broadcasts.");
    return success;
  } catch (error) {
    console.error("Error posting to WhatsApp:", error.message);
    return false;
  }
};

export const broadcastNews = async (title, content, imageUrl) => {
  const fullText = `${title}\n\n${content}`;

  // Execute all posts concurrently
  const [ig, li, wa] = await Promise.all([
    postToInstagram(fullText, imageUrl),
    postToLinkedIn(fullText, imageUrl),
    postToWhatsApp(fullText, imageUrl),
  ]);

  return { postedToInstagram: ig, postedToLinkedIn: li, postedToWhatsApp: wa };
};
