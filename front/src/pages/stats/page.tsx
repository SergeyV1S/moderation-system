import { Suspense } from "react";

import { Flex, Grid, Paper, Skeleton, Stack, Title } from "@mantine/core";

import {
  ActivityBarChart,
  CategoriesBarChart,
  DateRangePicker,
  DateRangePreset,
  DecisionsPieChart,
  SummaryStats
} from "./components";

const StatsPage = () => (
  <Flex direction='column' mih='90vh'>
    <Stack gap='lg' flex={1}>
      <Title order={1} size='h2'>
        Моя статистика
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
          <DateRangePicker />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 8 }}>
          <DateRangePreset />
        </Grid.Col>
      </Grid>

      <Paper p='lg' shadow='sm' withBorder radius={16}>
        <Suspense fallback={<Skeleton h={200} />}>
          <SummaryStats />
        </Suspense>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 8 }}>
          <Paper p='lg' shadow='sm' withBorder radius={16}>
            <Suspense fallback={<Skeleton h={200} />}>
              <ActivityBarChart />
            </Suspense>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Paper p='lg' shadow='sm' withBorder radius={16} h='100%'>
            <Suspense fallback={<Skeleton h={200} />}>
              <DecisionsPieChart />
            </Suspense>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper p='lg' shadow='sm' withBorder radius={16}>
        <Suspense fallback={<Skeleton h={200} />}>
          <CategoriesBarChart />
        </Suspense>
      </Paper>
    </Stack>
  </Flex>
);

export default StatsPage;
