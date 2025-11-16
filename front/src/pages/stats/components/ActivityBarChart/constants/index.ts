import { AD_STATUS } from "@/shared/constants";

export const barChartSeries = [
  { name: AD_STATUS["approved"], color: "green" },
  { name: AD_STATUS["rejected"], color: "red" },
  { name: AD_STATUS["pending"], color: "yellow" },
  { name: AD_STATUS["draft"], color: "gray" }
];
