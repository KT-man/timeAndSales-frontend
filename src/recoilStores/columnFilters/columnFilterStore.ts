import { ColumnFilter } from "@tanstack/react-table";
import { atom } from "recoil";

const columnFilterStore = atom<ColumnFilter[]>({
  key: "columnFilterStore",
  default: [{ id: "unixTime", value: 0 }],
});

export default columnFilterStore;
