import { BellIcon, WalletIcon } from "@heroicons/react/24/outline";
import IconBadge from "../badges/IconBadge";
import Badge from "../badges/Badge";
import useUserStore from "../../store/userStore";
import { Link } from "react-router";

const TopBar = () => {
  const { userInfo } = useUserStore();
  return (
    <div className="flex justify-between">
      {userInfo.first_name && (
        <Badge className="flex gap-x-2 items-center">
          <img
            src={userInfo.photo_url}
            className="size-7 object-fill rounded-full"
          />
          {userInfo.first_name.slice(0, 18)}
        </Badge>
      )}
      <div className="flex items-center gap-x-4">
        <Link to={"/test"}>
          <IconBadge Icon={WalletIcon} />
        </Link>
        <IconBadge Icon={BellIcon} />
      </div>
    </div>
  );
};

export default TopBar;
