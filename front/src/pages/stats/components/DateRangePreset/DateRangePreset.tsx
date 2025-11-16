import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { SegmentedControl } from "@mantine/core";

import styles from "./DateRangePreset.module.css";
import { DATE_RANGES } from "./constants";
import type { TDatePresetInterval } from "./types";

export const DateRangePreset = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const preset = searchParams.get("period") ?? "";

  const onPresetChange = (interval: TDatePresetInterval) => {
    const newParams = new URLSearchParams({
      period: interval
    });

    setSearchParams(newParams);
  };

  useEffect(() => {
    onPresetChange("today");
  }, []);

  return (
    <SegmentedControl
      classNames={styles}
      value={preset}
      withItemsBorders={false}
      data={Object.entries(DATE_RANGES).map(([label, value]) => ({
        label,
        value
      }))}
      onChange={onPresetChange}
    />
  );
};
