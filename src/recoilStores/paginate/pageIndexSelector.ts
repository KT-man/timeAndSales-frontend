import { selector } from "recoil";
import paginateStore from "./paginateStore";
import { PaginationState } from "@tanstack/react-table";

const pageIndexSelector = selector<number>({
  key: "pageIndexSelector",
  get: ({ get }) => {
    const { pageIndex } = get(paginateStore);
    return pageIndex;
  },
  set: ({ set }, newValue) => {
    set(paginateStore, (oldValue: PaginationState) => {
      return {
        ...oldValue,
        pageIndex: oldValue.pageIndex + Number(newValue),
      } as PaginationState;
    });
  },
});

export default pageIndexSelector;
