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

  const addWaifuBlock = () => {
    const styleEle = document.createElement("style");
    styleEle.innerHTML = CUSTOM_CSS;

    // use to select later
    styleEle.id = "dewaifu-style";

    console.log(styleEle);
    document.head.appendChild(styleEle);
  };

  const removeWaifuBlock = () => {
    // check if we found the style tag and doing nothing if we did
    const foundStyleEle = document.getElementById("dewaifu-style");
    if (foundStyleEle) {
      foundStyleEle.remove();
    }
  };

  console.log("Current state", enabled);
  if (enabled) {
    addWaifuBlock();
  } else {
    removeWaifuBlock();
  }
};

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

(async () => {
  const tabId = await getCurrentTab();
  const cur = await chrome.storage.local.get(ENABLED_KEY);
  if (!tabId) return;
  chrome.scripting.executeScript({
    // @ts-ignore
    target: { tabId: tabId.id },
    function: main,
    args: [cur],
  });
})();

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
