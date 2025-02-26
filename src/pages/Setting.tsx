import { ChangeEvent, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import WebApp from "@twa-dev/sdk";
import useUserStore from "../store/userStore";
import Title from "../components/typography/Title";
import Badge from "../components/badges/Badge";
import {
  BellAlertIcon,
  BellIcon,
  ChevronRightIcon,
  DevicePhoneMobileIcon,
  LanguageIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import Paragraph from "../components/typography/Paragraph";
import SwitchButton from "../components/inputs/SwitchButton";
const Setting = () => {
  const { userInfo } = useUserStore();
  const [switches, setSwitches] = useState({
    theme: false,
    animate: false,
    feedback: false,
    telegramNotification: false,
    configNotificatiom: false,
  });
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
  const statusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSwitches({
      ...switches,
      [e.target.name]: e.target.checked,
    });
  };
  return (
    <>
      <div className="curvyHeader overflow-hidden h-[112px] scale-x-110 animate-bounce-once relative p-8">
        <img
          src={userInfo.photo_url}
          className="size-20 object-fill rounded-full absolute inset-0 mx-auto z-10 top-[1.9rem] bg-primary"
        />
      </div>
      <Title className="text-center">{userInfo?.first_name}</Title>
      <Badge className="my-4 !rounded-xl [&>div:not(:last-child)]:border-b [&>div]:border-secondary-200 ">
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LanguageIcon className="size-7 bg-secondary-200 rounded-md p-1" />
            <Paragraph>Languege</Paragraph>
          </div>
          <Paragraph className="flex items-center gap-1">
            {userInfo?.language_code}
            <ChevronRightIcon className="size-4" />
          </Paragraph>
        </div>

        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MoonIcon className="size-7 bg-secondary-200 rounded-md p-1" />
            <Paragraph>Dark mode</Paragraph>
          </div>
          <SwitchButton
            label=""
            isChecked={switches.theme}
            onChange={statusHandler}
            name="theme"
          />
        </div>
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MoonIcon className="size-7 bg-secondary-200 rounded-md p-1" />
            <Paragraph>Animations</Paragraph>
          </div>
          <SwitchButton
            label=""
            isChecked={switches.animate}
            onChange={statusHandler}
            name="animate"
          />
        </div>

        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DevicePhoneMobileIcon className="size-7 bg-secondary-200 rounded-md p-1" />
            <Paragraph>Haptic feedback</Paragraph>
          </div>
          <SwitchButton
            label=""
            isChecked={switches.feedback}
            onChange={statusHandler}
            name="feedback"
          />
        </div>
      </Badge>
      <Badge className="mt-4 mb-28 !rounded-xl [&>div:not(:last-child)]:border-b [&>div]:border-secondary-200 ">
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellIcon className="size-7 bg-secondary-200 rounded-md p-1" />
            <Paragraph>Telegram notification</Paragraph>
          </div>

          <SwitchButton
            label=""
            isChecked={switches.telegramNotification}
            onChange={statusHandler}
            name="telegramNotification"
          />
        </div>
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellAlertIcon className="size-7 bg-secondary-200 rounded-md p-1" />
            <Paragraph>Config notification</Paragraph>
          </div>

          <SwitchButton
            label=""
            isChecked={switches.configNotificatiom}
            onChange={statusHandler}
            name="configNotificatiom"
          />
        </div>
      </Badge>
      <NavBar />
    </>
  );
};

export default Setting;
