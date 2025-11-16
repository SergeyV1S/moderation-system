import { Suspense } from "react";

import { Flex, Grid, Paper, Skeleton, Stack, Title } from "@mantine/core";

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

      <Paper p='lg' pos='relative' shadow='sm' withBorder radius={16}>
        <Suspense fallback={<Skeleton h={200} />}>
          <SummaryStats />
        </Suspense>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 8 }}>
          <Paper p='lg' pos='relative' shadow='sm' withBorder radius={16}>
            <Suspense fallback={<Skeleton h={200} />}>
              <ActivityBarChart />
            </Suspense>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Paper p='lg' pos='relative' shadow='sm' withBorder radius={16} h='100%'>
            <Suspense fallback={<Skeleton h={200} />}>
              <DecisionsPieChart />
            </Suspense>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper p='lg' pos='relative' shadow='sm' withBorder radius={16}>
        <Suspense fallback={<Skeleton h={200} />}>
          <CategoriesBarChart />
        </Suspense>
      </Paper>
    </Stack>
  </Flex>
);

export default StatsPage;
