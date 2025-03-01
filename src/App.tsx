import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

import useUserStore from "./store/userStore";
import { UserInfo_type } from "./store/types";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { useInitData } from "@zakarliuka/react-telegram-web-tools";
import SplashScreen from "./components/emojies/SplashScreen";
import Setting from "./pages/Setting";
import axios from "axios";

const App = () => {
  const { setUserInfo } = useUserStore();
  const { initData } = useInitData();
  const handleAuth = async () => {
    const options = {
      method: 'POST',
      url: 'https://botapi.zeroai.ir/account/TelegramAuth',
      headers: { 'Content-Type': 'application/json' },
      data: {
         "initdata": initData
      }
    };
  
    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(initData) { handleAuth(); }
  }
  , [initData]);
  
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
