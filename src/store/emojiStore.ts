import { create } from "zustand";
import { EmojiStore } from "./types";

const useEmojiStore = create<EmojiStore>((set) => ({
  splash: "",
  setEmojiSplash: (url: string) => set(() => ({ splash: url })),
}));

export default useEmojiStore;
