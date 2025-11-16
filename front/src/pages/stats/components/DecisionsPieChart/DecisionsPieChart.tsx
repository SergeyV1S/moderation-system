import { PieChart } from "@mantine/charts";
import { Center, Title } from "@mantine/core";

import { useDecisionsPieChart } from "./hooks";

export const DecisionsPieChart = () => {
  const { state } = useDecisionsPieChart();

  return (
    <>
      <Title order={2} size='h4'>
        Распределение решений в %
      </Title>
      <Center h='90%'>
        <PieChart
          data={state.pieChartData}
          labelsType='percent'
          withTooltip
          withLabels
          tooltipDataSource='segment'
        />
      </Center>
    </>
  );
};
