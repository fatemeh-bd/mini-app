import { useEffect } from "react";
import NavBar from "../components/navBar/NavBar";
import WebApp from "@twa-dev/sdk";
import useUserStore from "../store/userStore";
const Setting = () => {
  const { userInfo } = useUserStore();

  useEffect(() => {
    if (WebApp) {
      WebApp.ready();
      WebApp.expand();

      // تعیین رنگ هدر به رنگ پس‌زمینه تم تلگرام
      WebApp.setHeaderColor("bg_color");
      WebApp.setHeaderColor("#202020");
    } else {
      console.error("WebApp is not loaded");
    }
  }, []);

  return (
    <>
      <div className="curvyHeader relative p-8">
        <img
          src={userInfo.photo_url}
          className="size-16 object-fill rounded-full absolute inset-0 mx-auto z-50 top-[2.2rem] bg-primary"
        />
      </div>
      <NavBar />
    </>
  );
};

export default Setting;
