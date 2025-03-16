import { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import WebApp from "@twa-dev/sdk";
import useUserStore from "../store/userStore";
import Title from "../components/typography/Title";
import Badge from "../components/badges/Badge";
import {
  ArrowUpLeftIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Paragraph from "../components/typography/Paragraph";
import SwitchButton from "../components/inputs/SwitchButton";
import {
  HapticHeavy,
  HapticNotificationOccurredError,
  HapticNotificationOccurredSuccess,
} from "../utils/Utilitis";
import { apiRequest } from "../utils/apiProvider";
import {
  // POST_GET_USER_POROFILE,
  POST_UPDATE_TELEGRAM_NOTIFICATION_BY_STATE,
} from "../utils/endPoints";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Setting = () => {
  const { userInfo } = useUserStore();
  const [cookies] = useCookies(["accessToken"]);
  const [userData, setUserData] = useState<any>();
  const queryClient = useQueryClient();
  const token = cookies.accessToken;
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);
  useEffect(() => {
    if (WebApp) {
      WebApp.ready();
      WebApp.expand();
      WebApp.setHeaderColor("bg_color");
      WebApp.setHeaderColor("#202020");
    } else {
      console.error("WebApp is not loaded");
    }
  }, []);

  const updateTelegramNotification = async () => {
    setIsTelegramLoading(true);
    const updateTelegramNotificaionData = await apiRequest({
      method: "POST",
      endpoint: POST_UPDATE_TELEGRAM_NOTIFICATION_BY_STATE + !userData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return updateTelegramNotificaionData;
  };

  const updateTelegramMutation = useMutation({
    mutationFn: updateTelegramNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      HapticNotificationOccurredSuccess();
      setIsTelegramLoading(false);
      setUserData((prev : boolean)=>{
        return !prev
      });
    },
    onError: (error:any) => {
      HapticNotificationOccurredError();
      return error;
    },
  });

  // const fetchUserProfile = async () => {
  //   const periodsData = await apiRequest({
  //     method: "POST",
  //     endpoint: POST_GET_USER_POROFILE,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   // @ts-ignore
  //   setUserData(periodsData.data.sellerInfo.telegarmNotificaiton);
  //   return periodsData;
  // };

  // const profileQuery = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: fetchUserProfile,
  // });

  const openSupportChat = () => {
    WebApp.openTelegramLink("https://t.me/nexovp");
  };
  return (
    <>
      <div className="curvyHeader overflow-hidden h-[114px] scale-110 animate-bounce-once relative p-8">
        <img
          src={userInfo.photo_url ? userInfo.photo_url : "/nopf.jpg"}
          onError={(e) => {
            // @ts-ignore
            e.target.onerror = null;
            // @ts-ignore
            e.target.src = "/nopf.jpg";
          }}
          className="size-20 block object-fill rounded-full absolute inset-0 mx-auto z-10 top-[2rem] bg-primary"
        />
      </div>
      {userData && console.log(userData)}
      <Title className="text-center">{userInfo?.first_name}</Title>
      <div className="flex flex-col gap-4 ">
        <Badge className="mt-4 !rounded-xl [&>div:not(:last-child)]:border-b [&>div]:border-secondary-200 ">
          <div className="p-2 flex items-center justify-between" dir="rtl">
            <div className="flex items-center gap-2">
              <BellIcon className="size-7 bg-secondary-200 rounded-md p-1" />
              <Paragraph>دریافت اعلانات</Paragraph>
            </div>
            {isTelegramLoading ? (
              <div className="-ml-3">
                <div className="lds-ellipsis scale-[0.4] max-h-[10px]">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div dir="ltr">
                <SwitchButton
                  label=""
                  isChecked={userData && userData}
                  onChange={() => {
                    updateTelegramMutation.mutate();
                  }}
                  name="telegramNotification"
                />
              </div>
            )}
          </div>
        </Badge>
        <Badge className=" !rounded-xl [&>div:not(:last-child)]:border-b [&>div]:border-secondary-200 ">
          <div
            onClick={() => {
              HapticHeavy();
              openSupportChat();
            }}
            className="p-2 flex items-center justify-between"
            dir="rtl"
          >
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="size-7 bg-secondary-200 rounded-md p-1" />
              <Paragraph>پشتیبانی</Paragraph>
            </div>
            <ArrowUpLeftIcon className="size-5 ml-5 " />
          </div>
        </Badge>
      </div>
      <NavBar />
    </>
  );
};

export default Setting;
