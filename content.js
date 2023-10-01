/////

const cheerio = require("cheerio");
const axios = require("axios");

const profileUrls = [
  "https://www.linkedin.com/in/mathewcodex",
  "https://www.linkedin.com/in/stella-ladegbaye",
  "https://www.linkedin.com/in/daniella-atidigah",
];

chrome.runtime.onMessage.addListener(async (message, sender, sendRes) => {
  if (message.action === "scrapeLinkedInProfiles") {
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

        // Send a message to the extension with the scraped data
        chrome.runtime.sendMessage(
          {
            action: "scrapedProfiles",
            data: profiles,
          },
          (response) => console.log(response)
        );

        const response = await fetch("http://localhost:3000/api/postData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profiles),
        });
        if (response.ok) {
          console.log(`Data fetched successfully`);
        } else {
          console.error("Error sending data");
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    }

    try {
      await Promise.all(profileUrls.map((url) => scrapeData(url)));
      sendRes({ message: "Fetching completed" });
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
});
