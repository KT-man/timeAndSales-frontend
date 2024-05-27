import TimelineStoreInterface from "@/types/TimelineStoreInterface/TimelineStoreInterface";
import { atom } from "recoil";

const timelineStore = atom<TimelineStoreInterface>({
  key: "timeline",
  default: {
    startTime: 0,
    endTime: 0,
    currentTime: 0,
  },
});

export default timelineStore;
