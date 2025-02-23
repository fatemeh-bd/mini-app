import { create } from "zustand";
import { EmojiStore } from "./types";

const useEmojiStore = create<EmojiStore>((set) => ({
  splash: 2369285173,
  setEmojiSplash: (id: number) => set(() => ({ splash: id })),
}));

export default useEmojiStore;
