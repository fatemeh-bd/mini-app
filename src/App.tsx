import { useEffect } from "react";
import WebApp from "@twa-dev/sdk"; // اصلاح وارد کردن WebApp به صورت default
import TopBar from "./components/topBar/TopBar";
import useUserStore from "./store/userStore";
import { UserInfo_type } from "./store/types";

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
    <div className="p-4">
      <TopBar />
    </div>
  );
};

export default App;
