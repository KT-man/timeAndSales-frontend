import TimelineStoreInterface from "@/types/TimelineStoreInterface/TimelineStoreInterface";
import dayjs from "dayjs";
import { atom } from "recoil";

const timelineStore = atom<TimelineStoreInterface>({
  key: "timeline",
  default: {
    startTime: dayjs().unix(),
    endTime: dayjs().add(8, "hours").unix(),
    currentTime: dayjs().unix(),
  },
});

export default timelineStore;
