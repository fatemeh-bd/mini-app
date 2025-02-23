export interface UserInfo_type {
  first_name: string;
  last_name: string;
  photo_url: string;
}
export interface UserStore {
  userInfo: UserInfo_type;
  setUserInfo: (data: UserInfo_type) => void;
}
