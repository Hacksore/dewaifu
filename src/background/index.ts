// background script
console.log("Background script loaded");

chrome.runtime.onMessage.addListener((data, sender) => {
  if (data.type === "toggle_waifu") {
    chrome.storage.sync.get(["waifu"], function (item) {
      const state = item?.enabled || false
      console.log("Got waifu toggle request", state);
      chrome.storage.sync.set({ enabled: !state }, function () {        
      });
    });
  }
});
