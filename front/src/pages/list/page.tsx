import { Flex, Grid, Pagination, Select, Skeleton, Stack, Text, Title } from "@mantine/core";

import { AdCard, AdFilters, AdSearch } from "./components";
import { useListPage } from "./hooks";

const ListPage = () => {
  const { state, functions } = useListPage();

  return (
    <Flex direction='column' mih='90vh'>
      <Stack gap='lg' flex={1}>
        <Title order={1} size='h2'>
          Список объявлений
        </Title>
        <Grid gutter='md' align='end'>
          <Grid.Col span='auto'>
            <AdSearch />
          </Grid.Col>

          <Grid.Col span='content'>
            <Select
              maw={70}
              data={["10", "25", "50"]}
              value={state.adsQueryState.data?.data.pagination.itemsPerPage.toString()}
              onChange={functions.onLimitChange}
            />
          </Grid.Col>

          <Grid.Col span='content'>
            <AdFilters />
          </Grid.Col>
        </Grid>

        <Grid>
          {!state.adsQueryState.isPending &&
            state.adsQueryState.data.data.ads.map((ad) => (
              <Grid.Col key={ad.id} span={{ base: 12, xs: 6, md: 4 }}>
                <AdCard {...ad} />
              </Grid.Col>
            ))}
          {state.adsQueryState.isPending &&
            Array.from({ length: 6 }).map((_, index) => (
              <Grid.Col key={index} span={{ base: 12, xs: 6, md: 4 }}>
                <Skeleton height={450} />
              </Grid.Col>
            ))}
        </Grid>
      </Stack>

      <Stack align='center' gap='sm' pt='lg'>
        <Pagination
          radius='lg'
          value={state.adsQueryState.data?.data.pagination.currentPage}
          total={state.adsQueryState.data?.data.pagination.totalPages}
          disabled={state.adsQueryState.isPending}
          onChange={(page) => functions.onPageChange(page)}
        />
        <Text size='sm'>
          Всего {state.adsQueryState.data?.data.pagination.totalItems} объявлений
        </Text>
      </Stack>
    </Flex>
  );
};

export default ListPage;
