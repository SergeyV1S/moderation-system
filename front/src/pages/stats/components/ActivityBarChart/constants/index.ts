import { AD_STATUS } from "@/shared/constants";

export const activityBarChart = [
  { name: AD_STATUS["approved"], color: "green" },
  { name: AD_STATUS["rejected"], color: "red" },
  { name: AD_STATUS["requestChanges"], color: "yellow" },
  { name: AD_STATUS["draft"], color: "gray" }
];
