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

   if (tab.length > 0) {
     const curTab = tab[0];
     const curTaburl = curTab.url;
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

       document
         .getElementById("likeButton")
         .addEventListener("click", async () => {
           const likeCount = document.getElementById("likeCount").value;
           if (!likeCount) return;
           chrome.tabs.query(
             { active: true, currentWindow: true },
             function (tabs) {
               chrome.tabs.sendMessage(tabs[0].id, {
                 action: "likePosts",
                 count: likeCount,
               });
             }
           );
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

 const stringInput = document.getElementById("search1");
 const numberInput = document.getElementById("search2");
 const button = document.getElementById("button");

 button.addEventListener("click", function clickHandler(e) {
   const stringValue = stringInput.value;
   const numberValue = numberInput.value;
   button.disabled = false;
   const Array = [];

   for (let i = 1; i <= numberValue; i++) {
     button.disabled = true;
     Array.push(`https://www.linkedin.com/feed/`);
   }
   (async () => {
     for (j of Array) {
       await new Promise((resolve) => {
         chrome.tabs.update({ url: j, active: true }, (tab) => {
           chrome.tabs.onUpdated.addListener(function onUpdated(
             tabid,
             loading
           ) {
             if (tabid === tab.id && loading.status == "complete") {
               chrome.tabs.onUpdated.removeListener(onUpdated);
               chrome.tabs.executeScript(
                 tabid,
                 { file: "contentScript.js" },
                 () => {
                   chrome.tabs.sendMessage(
                     tab.id,
                     { greeting: "hello" },
                     (response) => {
                       const post = async (data) => {
                         const response = await fetch(
                           "http://localhost:3000/api/postData",
                           {
                             method: "POST",
                             headers: { "Content-type": "application/json" },
                             body: JSON.stringify(data),
                           }
                         );
                         const res = await response.json();
                         return res;
                       };

                       const res1 = post(response.data);
                       const userDetails = response.data;
                       console.log(userDetails);
                       console.log(res1);
                     }
                   );
                   resolve();
                 }
               );
             }
           });
         });
       });
     }
   })();
 });


      






