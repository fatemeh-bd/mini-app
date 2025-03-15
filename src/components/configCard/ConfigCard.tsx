import React, { useState } from "react";
import Badge from "../badges/Badge";
import ClipboardCopy from "../clipboardCopy/ClipboardCopy";
import {
  formatBytes,
  HapticHeavy,
  HapticNotificationOccurredError,
  HapticNotificationOccurredSuccess,
  HapticNotificationOccurredWarning,
} from "../../utils/Utilitis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiProvider";

import {
  POST_DELETE_CONFIG_BY_ID,
  POST_INCREASE_VOLUME,
  POST_RENEW_CONFIG_BY_ID,
} from "../../utils/endPoints";
import { useCookies } from "react-cookie";
import WebApp from "@twa-dev/sdk";

interface Config {
  subLink: string;
  userName: string;
  consumptionVolume: number;
  totalVolume: number;
  planeEnName: string;
  planName: string;
  isRenewal: boolean;
  connections: string[];
  id: string | number;
}

interface BadgeComponentProps {
  config: Config;
  isOpen: boolean;
  toggleOpen: () => void;
}

const ConfigCard: React.FC<BadgeComponentProps> = ({
  config,
  isOpen,
  toggleOpen,
}) => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const [deleteLodaing, setDeleteLoading] = useState(false);
  const [renewLoading, setRenewLoading] = useState(false);
  const progressPercentage =
    (config.consumptionVolume / config.totalVolume) * 100;
  const [userInputValue, setUserInputValue] = useState("");

  const deleteConfig = async () => {
    setDeleteLoading(true);
    const deleteConfigData = await apiRequest({
      method: "POST",
      endpoint: POST_DELETE_CONFIG_BY_ID + config.id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDeleteLoading(false);
    return deleteConfigData;
  };

  const deleteConfigMutation = useMutation({
    mutationFn: deleteConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      HapticNotificationOccurredSuccess();
    },
    onError: (error) => {
      HapticNotificationOccurredError();
      return error;
    },
  });

  const increaseConfig = async ({
    userInputValue,
  }: {
    userInputValue: string | number;
  }) => {
    const increaseConfigData = await apiRequest({
      method: "POST",
      endpoint: POST_INCREASE_VOLUME,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        clientId: Number(config.id),
        unitGB: Number(userInputValue),
      },
    });
    setDeleteLoading(false);
    return increaseConfigData;
  };

  const increaseConfigMutation = useMutation({
    mutationFn: increaseConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      setUserInputValue("");
      HapticNotificationOccurredSuccess();
    },
    onError: (error) => {
      HapticNotificationOccurredError();
      return error;
    },
  });

  const renewConfig = async () => {
    setRenewLoading(true);
    const renewConfigData = await apiRequest({
      method: "POST",
      endpoint: POST_RENEW_CONFIG_BY_ID + config.id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRenewLoading(false);
    return renewConfigData;
  }

  const renewConfigMutation = useMutation({
    mutationFn: renewConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      HapticNotificationOccurredSuccess();
    },
    onError: (error) => {
      HapticNotificationOccurredError();
      return error;
    },
  });

  const handleShowPopup = () => {
    let userInput = "";

    WebApp.showAlert(
      "کاربر گرامی در نظر داشته باشید هر گیگ حجم اضافه 1000 تومان محاسبه خواهد شد",
      () => {
        while (true) {
          HapticNotificationOccurredWarning();
          // @ts-ignore
          userInput = prompt(
            "لطفاً حجم مورد نظر را به عدد وارد کنید (حداکثر 50 گیگ)",
            ""
          );
          if (userInput === null) {
            return;
          }
          const userNumber = Number(userInput);
          if (!isNaN(userNumber) && userNumber > 0 && userNumber <= 50) {
            break;
          }

          HapticNotificationOccurredError();
          alert("حداکثر افزایش حجم 50 گیگابایت می‌باشد");
        }
        WebApp.showPopup(
          {
            title: "تأیید مقدار",
            message: `مقدار ${userInput} گیگابایت تأیید شود؟`,
            buttons: [
              // @ts-ignore
              { id: "ok", type: "ok", text: "تأیید" },
              // @ts-ignore
              { id: "cancel", type: "close", text: "خروج" },
            ],
          },
          (buttonId) => {
            if (buttonId === "ok") {
              increaseConfigMutation.mutate({ userInputValue: userInput });
            }
          }
        );
      }
    );
  };

  return (
    <Badge
      key={config.subLink}
      className={`px-2 rounded-lg ${isOpen ? "pt-3" : "py-3"}`}
    >
      <div onClick={toggleOpen} className="items-center justify-between gap-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">{config.userName}</span>
          <span>{config.planeEnName}</span>
        </div>
        <div className="flex-1 flex items-center gap-2 my-1">
          <div className="w-full">
            <div className="w-full bg-gray-200 h-2 rounded-lg">
              <div
                className="bg-blue-500 h-2 rounded-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="pt-1">
          <div className="flex items-center flex-row-reverse justify-between gap-2">
            <span>مصرف</span>
            <span>{formatBytes(config.consumptionVolume)}</span>
          </div>
          <div className="flex items-center justify-between gap-2 my-2">
            <ClipboardCopy
              title="کپی اشتراک"
              url={config.subLink}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M15.729 3.884c1.434-1.44 3.532-1.47 4.693-.304c1.164 1.168 1.133 3.28-.303 4.72l-2.423 2.433a.75.75 0 0 0 1.062 1.059l2.424-2.433c1.911-1.919 2.151-4.982.303-6.838c-1.85-1.857-4.907-1.615-6.82.304L9.819 7.692c-1.911 1.919-2.151 4.982-.303 6.837a.75.75 0 1 0 1.063-1.058c-1.164-1.168-1.132-3.28.303-4.72z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M14.485 9.47a.75.75 0 0 0-1.063 1.06c1.164 1.168 1.133 3.279-.303 4.72l-4.847 4.866c-1.435 1.44-3.533 1.47-4.694.304c-1.164-1.168-1.132-3.28.303-4.72l2.424-2.433a.75.75 0 0 0-1.063-1.059l-2.424 2.433c-1.911 1.92-2.151 4.982-.303 6.838c1.85 1.858 4.907 1.615 6.82-.304l4.847-4.867c1.911-1.918 2.151-4.982.303-6.837"
                  ></path>
                </svg>
              }
            />
            <div>
              {config.connections.length > 0 &&
                config.connections.map((connection, index) => (
                  <ClipboardCopy
                    key={index}
                    url={String(connection.link)}
                    title="کپی لینک اتصال"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M15.729 3.884c1.434-1.44 3.532-1.47 4.693-.304c1.164 1.168 1.133 3.28-.303 4.72l-2.423 2.433a.75.75 0 0 0 1.062 1.059l2.424-2.433c1.911-1.919 2.151-4.982.303-6.838c-1.85-1.857-4.907-1.615-6.82.304L9.819 7.692c-1.911 1.919-2.151 4.982-.303 6.837a.75.75 0 1 0 1.063-1.058c-1.164-1.168-1.132-3.28.303-4.72z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M14.485 9.47a.75.75 0 0 0-1.063 1.06c1.164 1.168 1.133 3.279-.303 4.72l-4.847 4.866c-1.435 1.44-3.533 1.47-4.694.304c-1.164-1.168-1.132-3.28.303-4.72l2.424-2.433a.75.75 0 0 0-1.063-1.059l-2.424 2.433c-1.911 1.92-2.151 4.982-.303 6.838c1.85 1.858 4.907 1.615 6.82-.304l4.847-4.867c1.911-1.918 2.151-4.982.303-6.837"
                        ></path>
                      </svg>
                    }
                  />
                ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-3">
            {config.planName !== "پلن تست" && !config.isRenewal && (
              <button
                onClick={handleShowPopup}
                className="w-full cursor-pointer !bg-primary !text-white !rounded-md text-center py-2"
              >
                افزایش حجم
              </button>
            )}
            {config.isRenewal && config.planName !== 'پلن تست' && (
              <button
               onClick={()=>{
                HapticHeavy()
                renewConfigMutation.mutate()
              }} className="w-full cursor-pointer !bg-primary !text-white !rounded-md text-center py-2">
                 {renewLoading ? (
                <div className="lds-ellipsis scale-[0.5] max-h-[10px]">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "تمدید"
              )}
              </button>
            )}

            <button
              onClick={() => {
                HapticHeavy();
                deleteConfigMutation.mutate();
              }}
              disabled={deleteLodaing}
              className="w-full cursor-pointer !bg-error !text-white !rounded-md text-center py-2"
            >
              {deleteLodaing ? (
                <div className="lds-ellipsis scale-[0.5] max-h-[10px]">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "حذف"
              )}
            </button>
          </div>
        </div>
      )}
    </Badge>
  );
};

export default ConfigCard;
