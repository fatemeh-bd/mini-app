import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk"; // فرض کنید این SDK به شما دسترسی به API تلگرام رو میده
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import Paragraph from "../typography/Paragraph";
import { HomeIcon } from "@heroicons/react/20/solid";
import Title from "../typography/Title";
import Badge from "../badges/Badge";

const someAsyncOperation = async () => {
  // عملیات غیرهمزمان مورد نظر رو اینجا انجام بدید
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

const NavBar = () => {
  const [openConfig, setOpenConfig] = useState(false);

  // کنترل نمایش و متن دکمه تلگرام
  useEffect(() => {
    if (openConfig) {
      WebApp.MainButton.setText("Next");
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }
  }, [openConfig]);

  // تنظیم handler کلیک برای MainButton
  useEffect(() => {
    const handleMainButtonClick = async () => {
      // فعال کردن loader (اگر API از setProgress پشتیبانی کنه)
      // @ts-ignore
      WebApp.MainButton.setProgress && WebApp.MainButton.setProgress(true);
      // انجام عملیات غیرهمزمان
      await someAsyncOperation();
      // خاموش کردن loader
      // @ts-ignore

      WebApp.MainButton.setProgress && WebApp.MainButton.setProgress(false);
      // انجام سایر عملیات (مثلاً بستن config)
      setOpenConfig(false);
    };

    WebApp.MainButton.onClick(handleMainButtonClick);
    return () => {
      WebApp.MainButton.offClick(handleMainButtonClick);
    };
  }, []);

  return (
    <div className="fixed right-0 left-0 h-fit w-full bottom-0 bg-white p-4 shadow-[0px_0px_4px] shadow-secondary-500">
      <div className="flex items-stretch justify-around gap-6">
        <HomeIcon className="size-7 text-primary" />
        <div
          className="bg-primary p-3 rounded-full absolute -top-6 cursor-pointer"
          onClick={() => setOpenConfig((prev) => !prev)}
        >
          <PlusIcon
            className={`size-8 text-white transition-all duration-500 ${
              openConfig ? "rotate-45" : ""
            }`}
          />
        </div>
        <Cog6ToothIcon className="size-7 text-secondary-500" />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          openConfig ? "opacity-100 h-auto p-4" : "opacity-0 h-0 p-0"
        }`}
      >
        <Title>Create new config</Title>
        <Paragraph light>select region</Paragraph>
        <div className="grid grid-cols-2 gap-3 my-2">
          <Badge className="!rounded-md text-center text-secondary-600">
            DE Germany
          </Badge>
          <Badge className="!rounded-md text-center text-secondary-600">
            NL Netherlands
          </Badge>
          <Badge className="!rounded-md text-center text-secondary-600">
            us United States
          </Badge>
          <Badge className="!rounded-md text-center text-secondary-600">
            TR Turkey
          </Badge>
        </div>
        {/* در این بخش شما نیازی به رندر دکمه ندارید؛ دکمه بومی تلگرام توسط API مدیریت می‌شود */}
      </div>

      <Paragraph light className="text-center pt-4">
        @Testmini
      </Paragraph>
    </div>
  );
};

export default NavBar;
