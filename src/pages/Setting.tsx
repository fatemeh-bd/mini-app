import { useEffect } from "react";
import NavBar from "../components/navBar/NavBar";
import WebApp from "@twa-dev/sdk";

const Setting = () => {
  useEffect(() => {
    if (WebApp) {
      WebApp.ready();
      WebApp.expand();

      // تعیین رنگ هدر به رنگ پس‌زمینه تم تلگرام
      WebApp.setHeaderColor("bg_color");
      WebApp.setHeaderColor("custom_color", "#ff6600");

    } else {
      console.error("WebApp is not loaded");
    }
  }, []);

  return (
    <div>
      <div className="curvyHeader bg-primary p-10 -mt-4"></div>
      <NavBar />
    </div>
  );
};

export default Setting;
