import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

import useUserStore from "./store/userStore";
import { UserInfo_type } from "./store/types";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import useEmojiStore from "./store/emojiStore";
import axios from "axios";

const App = () => {
  const { setUserInfo } = useUserStore();
  const { setEmojiSplash } = useEmojiStore();
  useEffect(() => {
    if (WebApp) {
      WebApp.ready();
      WebApp.expand();
      const fetchEmoji = async () => {
        try {
          const emojiId = "2369285173"; // Replace with a valid emoji ID
          const response = await axios.get(
            `https://api.telegram.org/bot8123335155:AAE2DjLwuOeEUiLliQzH_XdvfzSnzzr-kNI
/getCustomEmojiStickers?custom_emoji_ids=${emojiId}`
          );
          const emojiUrl = response.data.result[0].thumb.file_id; // Example: Get the emoji URL
          setEmojiSplash(emojiUrl); // Set the emoji URL or data
        } catch (error) {
          console.error("Failed to fetch emoji:", error);
        }
      };

      fetchEmoji();
      if (WebApp.initDataUnsafe) {
        if (WebApp.initDataUnsafe.user) {
          setUserInfo(WebApp.initDataUnsafe.user as UserInfo_type);
        }
      }
    } else {
      console.error("WebApp is not loaded");
    }
  }, []);

  return (
    <div className="p-4 bg-white h-screen overflow-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<h1>sdsdsd</h1>} />
      </Routes>
    </div>
  );
};

export default App;
