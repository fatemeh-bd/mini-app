import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import useUserStore from "./store/userStore";
import { UserInfo_type } from "./store/types";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { useInitData } from "@zakarliuka/react-telegram-web-tools";
import SplashScreen from "./components/emojies/SplashScreen";
import Setting from "./pages/Setting";
import { useCookies } from "react-cookie";
import { apiRequest } from "./utils/apiProvider";
import { POST_TELEGRAM_AUTH } from "./utils/endPoints";

const App = () => {
  const { setUserInfo } = useUserStore();
  const { initData } = useInitData();
  const [cookies, setCookie] = useCookies(["accessToken", "refreshKey"]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest({
        method: "POST",
        endpoint: POST_TELEGRAM_AUTH,
        body: { initdata: initData },
        headers: { "Content-Type": "application/json" },
      });

      // اطمینان از اینکه پاسخ دارای `data` است
      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response
      ) {
        const data = response.data as {
          accessToken?: string;
          refreshKey?: string;
          expireDate?: string;
        };

        if (data?.accessToken && data?.refreshKey && data?.expireDate) {
          const expireDate = new Date(data.expireDate);
          const maxAge = Math.floor((expireDate.getTime() - Date.now()) / 1000);

          setCookie("accessToken", data.accessToken, {
            path: "/",
            httpOnly: false,
            maxAge: maxAge > 0 ? maxAge : 0,
          });
          setCookie("refreshKey", data.refreshKey, {
            path: "/",
            httpOnly: false,
            maxAge: maxAge > 0 ? maxAge : 0,
          });
        }
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initData) {
      handleAuth();
    } else {
      setIsLoading(false);
    }
  }, [initData]);

  useEffect(() => {
    if (WebApp) {
      WebApp.ready();
      WebApp.expand();
      if (WebApp.initDataUnsafe?.user) {
        setUserInfo(WebApp.initDataUnsafe.user as UserInfo_type);
        // if (WebApp.platform == "ios") {
        //   WebApp.onEvent("viewportChanged", () => {
        //     setTimeout(() => {
        //       document.documentElement.scrollTop = 12000;
        //     }, 700);
        //   });
        // }
      }
    } else {
      console.error("WebApp is not loaded");
    }
  }, []);

  if (isLoading || !cookies.accessToken) {
    return <SplashScreen />;
  }

  return (
    <div className="p-4 bg-white h-svh overflow-auto no-scrollbar max-w-[100vw] overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
};

export default App;
