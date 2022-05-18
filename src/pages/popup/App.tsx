import React, { useEffect, useState } from "react";
import { ENABLED_KEY, TOGGLE_WAIFU } from "../../constants";

const App = (): JSX.Element => {
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    // handle first load
    syncWaifuState();
  }, []);

  const syncWaifuState = () => {
    chrome.storage.local.get(ENABLED_KEY, result => {
      setButtonState(result[ENABLED_KEY]);
    });
  };

  const toggleWaifuMode = async () => {
    setButtonState(!buttonState);
    chrome.runtime.sendMessage({ type: TOGGLE_WAIFU });
  };

  const buttonVerbText = buttonState ? "Unblock" : "Block";
  const buttonColor = buttonState ? "#d14747" : "#73b260";

  return (
    <div>
      <h1>Dewaifu</h1>
      <button
        style={{
          cursor: "pointer",
          color: "#fff",
          height: 30,
          background: buttonColor,
          borderRadius: 20,
          width: "100%",
          fontWeight: "bold",
        }}
        onClick={toggleWaifuMode}
      >
        {buttonVerbText}
      </button>
    </div>
  );
};

export default App;
