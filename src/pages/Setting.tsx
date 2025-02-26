import { useEffect } from "react";
import NavBar from "../components/navBar/NavBar";
import WebApp from "@twa-dev/sdk";
import useUserStore from "../store/userStore";
// import reactIcon from "../assets/react.svg";
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
    <div>
      <div className="curvyHeader relative bg-primary p-8 -mt-4">
        <img
          // src={reactIcon}
          src={userInfo.photo_url}
          className="size-12 object-fill rounded-full absolute inset-0 mx-auto z-50 top-[2rem] bg-primary"
        />
      </div>
      <NavBar />
    </div>
  );
};

export default Setting;
