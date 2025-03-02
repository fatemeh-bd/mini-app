import { BellIcon, WalletIcon } from '@heroicons/react/24/outline';
import IconBadge from '../badges/IconBadge';
import Badge from '../badges/Badge';
import useUserStore from '../../store/userStore';
import DropdownMenu from '../dropdown/DropDownMenu';
import Paragraph from '../typography/Paragraph';
import { POST_USER_BALANCE } from '../../utils/endPoints';
import { apiRequest } from '../../utils/apiProvider';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const TopBar = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const [cookies] = useCookies(['accessToken']);
  const queryClient = useQueryClient();
  const fetchUserBalance = async () => {
    try {
      const balance = await apiRequest<{ balance: any }>({
        method: 'POST',
        endpoint: POST_USER_BALANCE,
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      // @ts-ignore
      setUserInfo({ ...userInfo, balance: String(balance.data) });
    } catch (error) {
      console.error('Failed to fetch user balance:', error);
    }
  };

  const query = useQuery({ queryKey: ['balance'], queryFn: fetchUserBalance });
  useEffect(() => {
    query && queryClient.invalidateQueries({ queryKey: ['balance'] });
  }, [cookies.accessToken, setUserInfo]);

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
        }>
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
            <li className="flex items-center overflow-hidden whitespace-nowrap w-full relative">
              <div className="">
                <Paragraph>
                  {userInfo.balance
                    ? new Intl.NumberFormat('en-US').format(
                        Number(userInfo.balance)
                      )
                    : '0'}
                </Paragraph>
              </div>
              <Paragraph className="ml-[-2px] px-2 py-1 relative z-10">
                Toman
              </Paragraph>
            </li>

            {/* <li>
              <Paragraph>Requests</Paragraph>
            </li> */}
          </ul>
        </DropdownMenu>
        <IconBadge Icon={BellIcon} />
      </div>
    </div>
  );
};

export default TopBar;
