import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { SegmentedControl } from "@mantine/core";

import { updateSearchParams } from "@/shared/utils";

import styles from "./DateRangePreset.module.css";
import { DATE_RANGES } from "./constants";
import type { TDatePresetInterval } from "./types";

export const DateRangePreset = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = updateSearchParams(searchParams, setSearchParams);

  const preset = searchParams.get("period") ?? "";
  const startDate = searchParams.get("startDate") ?? "";

  const onPresetChange = (interval: TDatePresetInterval) => {
    updateParams({ period: interval, startDate: "", endDate: "" });
  };

  useEffect(() => {
    if (!preset) onPresetChange("today");
  }, []);

  return (
    <SegmentedControl
      classNames={styles}
      value={startDate ? "" : preset}
      withItemsBorders={false}
      data={Object.entries(DATE_RANGES).map(([label, value]) => ({
        label,
        value
      }))}
      onChange={onPresetChange}
    />
  );
};
