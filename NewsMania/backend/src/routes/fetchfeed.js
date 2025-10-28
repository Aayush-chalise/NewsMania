import Parser from "rss-parser";
import express from "express";

const router = express.Router();
const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

const feeds = [
  "https://nagariknews.nagariknetwork.com/feed",
  "https://www.newsofnepal.com/feed",
  "https://www.onlinekhabar.com/feed",
  "https://feeds.bbci.co.uk/news/rss.xml",

  "https://www.rajdhanidaily.com/feed",

  "https://www.osnepal.com/feed",
  "https://www.setopati.com/feed",
];

router.get("/", async (req, res) => {
  try {
    console.log("hello");
    const allArticles = [];

    for (const url of feeds) {
      const feed = await parser.parseURL(url);

      const items = feed.items.map((item) => {
        // Extract description
        const description =
          item.contentSnippet ||
          item.contentEncoded ||
          item.description ||
          "No description available.";

        // Try to find image from multiple sources
        const image =
          item.enclosure?.url ||
          item.mediaContent?.url ||
          item.mediaThumbnail?.url ||
          extractImageFromHTML(item.contentEncoded) ||
          extractImageFromHTML(item.content) ||
          null;

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: feed.title,
          description,
          image,
        };
      });

      allArticles.push(...items);
    }

    res.json(allArticles);
  } catch (err) {
    console.error("Fetch-feed error:", err);
    res.status(500).json({ error: "Failed to fetch feeds" });
  }
});

// Helper function: extract first <img> tag from HTML content
function extractImageFromHTML(html) {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

export default router;

// import Parser from "rss-parser";
// import express from "express";

// const router = express.Router();

// const parser = new Parser();
// const feeds = [
//   "https://www.onlinekhabar.com/feed",
//   "https://feeds.bbci.co.uk/news/rss.xml",
//   "https://nagariknews.nagariknetwork.com/feed",
//   "https://www.rajdhanidaily.com/feed",
//   "https://www.newsofnepal.com/feed",
//   "https://www.osnepal.com/feed",

//   "https://www.setopati.com/feed",

//   // "https://rss.cnn.com/rss/edition_world.rss",
// ];

// router.get("/", async (req, res) => {
//   try {
//     console.log("hahah");
//     const allArticles = [];
//     for (const url of feeds) {
//       const feed = await parser.parseURL(url);
//       const items = feed.items.map((item) => ({
//         title: item.title,
//         link: item.link,
//         pubDate: item.pubDate,
//         source: feed.title,
//       }));
//       allArticles.push(...items);
//     }
//     res.json(allArticles);
//   } catch (err) {
//     console.error("Fetch-feed error:", err);

//     res.status(500).json({ error: "Failed to fetch feeds" });
//   }
// });

// export default router;
