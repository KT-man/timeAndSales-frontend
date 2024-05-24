import { atom } from "recoil";

const pageCountStore = atom<number>({
  key: "pageCountStore",
  default: 0,
});

export default pageCountStore;
