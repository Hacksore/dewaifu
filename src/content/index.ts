import { ENABLED_KEY, UPDATE_WAIFU_STATE } from "../constants";
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

  document.head.appendChild(styleEle);
};

const removeWaifuBlock = () => {
  // check if we found the style tag and doing nothing if we did
  const foundStyleEle = document.getElementById("dewaifu-style");
  if (foundStyleEle) {
    foundStyleEle.remove();
  }
};

const main = (enabled: boolean) => {
  if (enabled) {
    addWaifuBlock();
  } else {
    removeWaifuBlock();
  }
};

// When the popup tells us to toggle waifu
chrome.runtime.onMessage.addListener(data => {
  if (data.type === UPDATE_WAIFU_STATE) {
    main(data.value);
  }
});

// When we first eval the page we set based on the current state
chrome.storage.local.get(ENABLED_KEY, function (val) {
  main(val[ENABLED_KEY]);
});
