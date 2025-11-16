import { BarChart } from "@mantine/charts";
import { Paper } from "@mantine/core";

import { barChartSeries } from "./constants";
import { useActivityBarChart } from "./hooks";

export const ActivityBarChart = () => {
  const { state } = useActivityBarChart();

  return (
    <Paper p='lg' shadow='sm' withBorder radius={16}>
      <BarChart
        h={300}
        type='stacked'
        data={state.barChartData}
        dataKey='date'
        series={barChartSeries}
        tooltipAnimationDuration={300}
        tickLine='none'
        gridAxis='none'
      />
    </Paper>
  );
};
