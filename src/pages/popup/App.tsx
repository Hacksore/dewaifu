import React, { useEffect } from "react";

const App = (): JSX.Element => {
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "toggle_waifu" });
  }, []);

  return (
    <div>
      <h1>Popup Page</h1>
      <p>If you are seeing this, React is working!</p>
    </div>
  );
};

export default App;
