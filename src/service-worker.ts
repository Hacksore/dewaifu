import { ENABLED_KEY } from "./constants";

const main = async (enabled: boolean) => {
  const DOGE_PIC = "https://i.imgur.com/SIs7Kdk.jpg";

  // janky styles to override on youtube
  const CUSTOM_CSS = `
.ytd-thumbnail {
  background-size: cover;
  background-image: url("${DOGE_PIC}");
}

.yt-img-shadow {
  display: none !important;
}

.html5-video-player {
  background-size: cover;
  background-image: url("${DOGE_PIC}");
}

.html5-main-video {  
  opacity: 0 !important;
}

`;

  const tagExists = () => {
    const foundStyleEle = document.getElementById("dewaifu-style");
    if (foundStyleEle) {
      return true;
    }

    return false;
  }

  const addWaifuBlock = () => {
    const styleEle = document.createElement("style");
    styleEle.innerHTML = CUSTOM_CSS;

    // use to select later
    styleEle.id = "dewaifu-style";
    document.head.appendChild(styleEle);
  };

  const removeWaifuBlock = () => {
    // check if we found the style tag and doing nothing if we did
    const foundStyleEle = document.getElementById("dewaifu-style") as HTMLElement;
    foundStyleEle.remove();
  };

  if (enabled) {
    if (!tagExists()) {
      addWaifuBlock();
    }
  } else {
    removeWaifuBlock();
  }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url?.includes("youtube.com")) {
    return;
  }

  if (changeInfo.status == "loading") {
    const currentState = await chrome.storage.local.get(ENABLED_KEY);
    if (!tabId) return;

    // BUG: we cant seem to do what we did in v2 where we ran at document_start
    // issue https://bugs.chromium.org/p/chromium/issues/detail?id=1303199
    chrome.scripting.executeScript({
      // @ts-ignore
      target: { tabId: tabId },
      // @ts-ignore
      function: main,
      args: [currentState[ENABLED_KEY]],
    });
  }
});

const updateIcon = async () => {
  // when the work starts set the icon
  const currentVal = await chrome.storage.local.get(ENABLED_KEY);
  // update the icon
  const icon = currentVal[ENABLED_KEY] ? "on" : "off";
  chrome.action.setIcon({ path: `${icon}.png` });

}

updateIcon();

chrome.action.onClicked.addListener(async tab => {
  if (!tab.url?.includes("youtube.com")) {
    return;
  }

  const currentVal = await chrome.storage.local.get(ENABLED_KEY);

  // update the state
  const newState = !currentVal[ENABLED_KEY];
  await chrome.storage.local.set({ [ENABLED_KEY]: newState });

  // update the icon
  updateIcon();
  

  if (!tab.id) return;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    // @ts-ignore
    function: main,
    args: [newState],
  });
});
