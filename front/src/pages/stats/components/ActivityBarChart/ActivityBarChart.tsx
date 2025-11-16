import { BarChart } from "@mantine/charts";
import { Title } from "@mantine/core";

import { activityBarChart } from "./constants";
import { useActivityBarChart } from "./hooks";

export const ActivityBarChart = () => {
  const { state } = useActivityBarChart();

  return (
    <>
      <Title order={2} size='h4'>
        Активность
      </Title>
      <BarChart
        pt={24}
        h={300}
        type='stacked'
        data={state.barChartData}
        dataKey='date'
        series={activityBarChart}
        tooltipAnimationDuration={300}
        tickLine='none'
        gridAxis='none'
      />
    </>
  );
};
