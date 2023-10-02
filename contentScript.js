chrome.runtime.onMessage.addListener( async (req, sender, sendResponse) => {
    const cheerio = require("cheerio");
const axios = require("axios");

const profileUrls = [
  "https://www.linkedin.com/in/mathewcodex",
  "https://www.linkedin.com/in/stella-ladegbaye",
  "https://www.linkedin.com/in/daniella-atidigah",
];
  if (req.action === "scrapedProfiles") {
    const profiles = [];

    async function scrapeData(url) {
      try {
        const res = await axios.get(url);
        const html = res.data;
        const $ = cheerio.load(html);

        const name1 = $(
          ".text-heading-xlarge.inline.t-24.v-align-middle.break-words"
        )
          .text()
          .trim();
        const location1 = $(
          ".text-body-small.inline.t-black--light.break-words"
        )
          .text()
          .trim();
        const bio1 = $(".inline-show-more-text--is-collapsed-with-line-clamp")
          .text()
          .trim();

        const connectCount1 = $(".t-bold").text().trim();

        const followerCount1 = $(
          ".pvs-header__subtitle.pvs-header__optional-link.text-body-small"
        )
          .text()
          .trim();

        const profileData1 = {
          name1,
          location1,
          bio1,
          followerCount1,
          connectCount1,
        };
        profiles.push(profileData1);

        sendResponse({ profiles });
      } catch (err) {
        console.error("Error:", err.message);
      }
    }

    try {
      await Promise.all(profileUrls.map((url) => scrapeData(url)));
      sendRes({ message: "Fetching completed" });
    } catch (err) {
      console.error("Error:", "Url error " + err.message);
    }
  }
});