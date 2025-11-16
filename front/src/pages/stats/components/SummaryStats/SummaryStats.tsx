import { Grid, Group, Paper, Text, Title } from "@mantine/core";

import { useSummaryStats } from "./hooks/useSummaryStats";

export const SummaryStats = () => {
  const { state } = useSummaryStats();

  return (
    <>
      <Title order={2} size='h3'>
        Общая статистика
      </Title>
      <Grid pt={16}>
        {state.statCards.map((stat) => (
          <Grid.Col key={stat.label} span={{ base: 12, sm: 6, lg: 4 }}>
            <Paper p='lg' withBorder radius={16}>
              <Group>
                <stat.icon size={24} color={`var(--mantine-color-${stat.color}-6)`} />
                <Group>
                  <Text size='sm' c='dimmed'>
                    {stat.label}
                  </Text>
                  <Text fw={700} size='xl'>
                    {stat.value}
                  </Text>
                </Group>
              </Group>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};
