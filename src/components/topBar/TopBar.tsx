import { BellIcon, WalletIcon } from "@heroicons/react/24/outline";
import IconBadge from "../badges/IconBadge";
import Badge from "../badges/Badge";
import useUserStore from "../../store/userStore";
import DropdownMenu from "../dropdown/DropDownMenu";
import Paragraph from "../typography/Paragraph";

const TopBar = () => {
  const { userInfo } = useUserStore();
  return (
    <div className="flex justify-between">
      <DropdownMenu
        isOpenLeft
        component={
          <Badge className="flex gap-x-2 items-center">
            {userInfo.first_name && (
              <>
                <img
                  src={userInfo.photo_url}
                  className="size-7 object-fill rounded-full"
                />
                {userInfo.first_name.slice(0, 18)}
              </>
            )}
          </Badge>
        }
      >
        <ul className="[&>li:not(:last-child)]:border-b [&>li]:border-secondary-100 [&>li]:py-1.5 [&>li]:px-3">
          {userInfo.first_name && (
            <li>
              <img
                src={userInfo.photo_url}
                className="size-8 object-fill rounded-full"
              />
            </li>
          )}
          <li className="space-y-1">
            <Paragraph>Settings</Paragraph>
            <Paragraph>Feedback</Paragraph>
          </li>
          <li>
            <Paragraph theme="error">Delete account</Paragraph>
          </li>
        </ul>
      </DropdownMenu>

      <div className="flex items-center gap-x-4">
        <DropdownMenu component={<IconBadge Icon={WalletIcon} />}>
          <ul className="[&>li:not(:last-child)]:border-b [&>li]:border-secondary-100 [&>li]:py-1.5 [&>li]:px-3">
            <li>
              <Paragraph>0 Toman</Paragraph>
            </li>
            <li>
              <Paragraph>Requests</Paragraph>
            </li>
          </ul>
        </DropdownMenu>
        <IconBadge Icon={BellIcon} />
      </div>
    </div>
  );
};

export default TopBar;
