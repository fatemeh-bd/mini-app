export interface UserInfo_type {
  first_name: string;
  last_name: string;
  photo_url: string;
  language_code?: string;
  balance?: number | string;
}
export interface UserStore {
  userInfo: UserInfo_type;
  setUserInfo: (data: UserInfo_type) => void;
}
export interface EmojiStore {
  splash: string;
  setEmojiSplash: (url: string) => void;
}
