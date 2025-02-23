import { create } from "zustand";
import { UserInfo_type, UserStore } from "./types";

const useUserStore = create<UserStore>((set) => ({
  userInfo: {
    first_name: "",
    last_name: "",
    photo_url: "",
  },
  setUserInfo: (data: UserInfo_type) => set(() => ({ userInfo: data })),
}));

export default useUserStore;
