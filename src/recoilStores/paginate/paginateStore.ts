import { PaginationState } from "@tanstack/react-table";
import { atom } from "recoil";

const paginateStore = atom<PaginationState>({
  key: "paginate",
  default: {
    pageIndex: 0,
    pageSize: 30,
  },
});

export default paginateStore;
