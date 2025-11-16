import { Suspense } from "react";

import { Box, Flex, Stack, Title } from "@mantine/core";

import { CustomLoader as Loader } from "@/shared/ui";

import {
  ActivityBarChart,
  CategoriesBarChart,
  DateRangePreset,
  DecisionsPieChart,
  SummaryStats
} from "./components";

const StatsPage = () => (
  <Flex direction='column' mih='90vh'>
    <Stack gap='lg' flex={1}>
      <Title order={1}>Моя статистика</Title>
      <DateRangePreset />

      <Box pos='relative'>
        <Suspense fallback={<Loader />}>
          <SummaryStats />
        </Suspense>
      </Box>

      <Box pos='relative'>
        <Suspense fallback={<Loader />}>
          <ActivityBarChart />
        </Suspense>
      </Box>

      <Box pos='relative'>
        <Suspense fallback={<Loader />}>
          <DecisionsPieChart />
        </Suspense>
      </Box>

      <Box pos='relative'>
        <Suspense fallback={<Loader />}>
          <CategoriesBarChart />
        </Suspense>
      </Box>
    </Stack>
  </Flex>
);

export default StatsPage;
