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
  if (changeInfo.status == "complete") {
    const currentState = await chrome.storage.local.get(ENABLED_KEY);
    if (!tabId) return;

    chrome.scripting.executeScript({
      // @ts-ignore
      target: { tabId: tabId },
      // @ts-ignore
      function: main,
      args: [currentState[ENABLED_KEY]],
    });
  }
});

chrome.action.onClicked.addListener(async tab => {
  const currentVal = await chrome.storage.local.get(ENABLED_KEY);

  // update the state
  const newVal = !currentVal[ENABLED_KEY];
  await chrome.storage.local.set({ [ENABLED_KEY]: newVal });

  if (!tab.id) return;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    // @ts-ignore
    function: main,
    args: [newVal],
  });
});
