import { ENABLED_KEY, UPDATE_WAIFU_STATE, TOGGLE_WAIFU } from "../constants";

chrome.runtime.onMessage.addListener(data => {
  if (data.type === TOGGLE_WAIFU) {
    chrome.storage.local.get([ENABLED_KEY], function (item) {
      const newValue = !item[ENABLED_KEY];
      chrome.storage.local.set({ [ENABLED_KEY]: newValue }, function () {
        // send update to content script
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const activeTabId = tabs[0].id;
          if (activeTabId) {
            chrome.tabs.sendMessage(activeTabId, { type: UPDATE_WAIFU_STATE, value: newValue });
          }
        });
      });
    });
  }
});
