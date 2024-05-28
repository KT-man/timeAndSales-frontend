import { selector } from "recoil";
import timelineStore from "./timelineStore";
import TimelineStoreInterface from "@/types/TimelineStoreInterface/TimelineStoreInterface";

const currentTimeSelector = selector({
  key: "currentTimeSelector",
  get: ({ get }) => get(timelineStore).currentTime,
  set: ({ set }, newValue): void => {
    set(timelineStore, (oldValue: TimelineStoreInterface) => {
      return {
        ...oldValue,
        pageIndex: newValue,
      } as TimelineStoreInterface;
    });
  },
});

export default currentTimeSelector;
