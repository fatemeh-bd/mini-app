import { BellIcon } from "@heroicons/react/24/outline";
import IconBadge from "../badges/IconBadge";
import Badge from "../badges/Badge";
import useUserStore from "../../store/userStore";
import DropdownMenu from "../dropdown/DropDownMenu";
import Paragraph from "../typography/Paragraph";
import { POST_USER_BALANCE } from "../../utils/endPoints";
import { apiRequest } from "../../utils/apiProvider";
import {  useEffect } from "react";
import { useCookies } from "react-cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TopBar = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const [cookies] = useCookies(["accessToken"]);
  const queryClient = useQueryClient();
  const fetchUserBalance = async () => {
    try {
      const balance = await apiRequest<{ balance: any }>({
        method: "POST",
        endpoint: POST_USER_BALANCE,
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      // @ts-ignore
      setUserInfo({ ...userInfo, balance: String(balance.data) });
      return balance;
    } catch (error) {
      console.error("Failed to fetch user balance:", error);
    }
  };

  const query = useQuery({ queryKey: ["balance"], queryFn: fetchUserBalance });
  useEffect(() => {
    query && queryClient.invalidateQueries({ queryKey: ["balance"] });
  }, [cookies.accessToken, setUserInfo]);

  return (
    <div className="flex justify-between">
      <DropdownMenu
        component={
          <Badge className="flex min-w-[40px] min-h-[40px] gap-x-2 items-center">
            <img
              src={userInfo.photo_url ? userInfo.photo_url : "/nopf.jpg"}
              className="size-8 object-fill rounded-full"
              onError={(e) => {
                // @ts-ignore
                e.target.onerror = null;
                // @ts-ignore
                e.target.src = "/nopf.jpg";
              }}
            />
          </Badge>
        }
      >
        <ul className="[&>li:not(:last-child)]:border-b [&>li]:border-secondary-100 [&>li]:py-1.5 [&>li]:px-3">
          {userInfo.first_name && <li>{userInfo.first_name}</li>}

          <li className="space-y-1">
            <Paragraph>تنظیمات</Paragraph>
            <Paragraph>بازخورد</Paragraph>
          </li>
          <li>
            <Paragraph theme="error">حذف حساب</Paragraph>
          </li>
        </ul>
      </DropdownMenu>

      <div className="flex items-center  gap-x-4">
        <Paragraph>
          {userInfo.balance
            ? new Intl.NumberFormat("en-US").format(Number(userInfo.balance))
            : "0"}{" "}
          تومان
        </Paragraph>
        <IconBadge Icon={BellIcon} />
      </div>
    </div>
  );
};

export default TopBar;
