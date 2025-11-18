import { useState } from "react";
import { useSearchParams } from "react-router";

import { useDidUpdate } from "@mantine/hooks";

import { updateSearchParams } from "@/shared/utils";

import type { TDateRange } from "../types";

export const useDateRangePicker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = updateSearchParams(searchParams, setSearchParams);

  const paramFrom = searchParams.get("startDate");
  const paramTo = searchParams.get("endDate");

  const from = paramFrom && new Date(+paramFrom);
  const to = paramTo && new Date(+paramTo);

  const [dateRange, setDateRange] = useState<TDateRange>([from, to]);

  useDidUpdate(() => {
    setDateRange([from, to]);
  }, [paramFrom, paramTo]);

  const handleDateRangeChange = (dates: string[]) => {
    const startDate = dates[0] ? new Date(dates[0]) : null;
    const endDate = dates[1] ? new Date(dates[1]) : null;

    setDateRange([startDate, endDate]);

    if (!startDate && !endDate) {
      updateParams({
        startDate: "",
        endDate: ""
      });
      return;
    }

    if (!startDate || !endDate) return;

    updateParams({
      startDate: startDate.getTime().toString(),
      endDate: endDate.getTime().toString()
    });
  };

  return { state: { dateRange }, functions: { handleDateRangeChange } };
};
