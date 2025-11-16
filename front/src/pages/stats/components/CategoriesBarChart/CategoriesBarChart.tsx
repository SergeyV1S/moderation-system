import { BarChart } from "@mantine/charts";
import { Title } from "@mantine/core";

import { useCategoriesBarChart } from "./hooks";

export const CategoriesBarChart = () => {
  const { state } = useCategoriesBarChart();

  return (
    <>
      <Title order={2} size='h4'>
        Проверенные категории
      </Title>
      <BarChart
        h={300}
        pt={24}
        type='stacked'
        data={state.barChartData}
        dataKey='category'
        series={[
          {
            name: "Количество",
            color: "cyan"
          }
        ]}
        tooltipAnimationDuration={300}
        tickLine='none'
        gridAxis='none'
      />
    </>
  );
};
