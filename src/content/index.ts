import { CUSTOM_CSS } from "../constants";

export default (enabled: boolean) => {
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

  // enabled 
  if (enabled) {
    addWaifuBlock();
  } else {
    removeWaifuBlock();
  }

}