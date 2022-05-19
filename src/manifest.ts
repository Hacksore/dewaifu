// {
//   "background": { "scripts": ["background/index.ts"] },
//   "content_scripts": [
//     {
//       "run_at": "document_start",
//       "js": ["content/index.ts"],
//       "matches": ["https://*/*", "http://*/*"]
//     }
//   ],
//   "browser_action": { "default_popup": "pages/popup/index.html" },
//   "permissions": ["storage"]
// }
import { ManifestV3 } from "rollup-plugin-chrome-extension";

const manifest: ManifestV3 = {
  manifest_version: 3,
  background: {
    service_worker: "background.ts",
  },
  permissions: ["activeTab", "scripting", "storage"],
  action: {},
  content_scripts: [
    {
      js: ["content/index.ts"],
      matches: ["https://*.youtube.com/*"],
    },
  ],
};

export default manifest;
