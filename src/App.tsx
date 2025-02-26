import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

import useUserStore from "./store/userStore";
import { UserInfo_type } from "./store/types";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import SplashScreen from "./components/emojies/SplashScreen";
import Setting from "./pages/Setting";

const App = () => {
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    if (WebApp) {
      WebApp.ready();
      WebApp.expand();
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
    <div className="p-4 bg-white h-svh overflow-auto">
      <SplashScreen />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
};

export default App;
