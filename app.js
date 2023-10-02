const popData = (response) => {
    chrome.storage.sync.set({ response },async  () => {
        await fetch("http://localhost:3000/api/postData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });
        if (response.ok) {
          console.log(`Data fetched successfully`);
        } else {
          console.error("Error sending data");
        }
    });
    
}
 chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
//    const activeTab = tabs[0];

if (tab.length > 0){
    const curTab = tab[0];
    const curTaburl = curTab.url
    if (curTaburl === "https://www.linkedin.com/in/*") {
      chrome.storage.sync.get(["response"], (result) => {
        popData(result.response);
      });

      document.querySelector(".import").addEventListener("click", async () => {
        chrome.tabs.sendMessage(
          tab.id,
          { action: "scrapedProfiles" },
          async (response) => {
            popData(response);
            console.log(response);
          }
        );

        //  const response =
      });
      // Send a message to the extension with the scraped data
    //   document.querySelector(".clear").addEventListener("click", () => {
    //     chrome.storage.sync.clear();

    //     document.querySelector(".disclaimer").classList.remove("hidden");
    //     document.querySelector(".shopping-list").classList.add("hidden");
    //   });
    }
   
}
//   if (tab.url.includes("www.linkedin.com/in/")) {
   
//   } 
 });