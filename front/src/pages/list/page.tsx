import { Button, Flex, Grid, Pagination, Popover, Stack, Text, Title } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

import { CustomLoader as Loader } from "@/shared/ui";

import { AdCard, AdFilters, AdSearch } from "./components";
import { useListPage } from "./hooks";

const ListPage = () => {
  const { state, functions } = useListPage();

  return (
    <Flex direction='column' mih='90vh'>
      <Stack gap='lg' flex={1}>
        <Title order={1}>Список объявлений</Title>
        <Flex align='center' gap={20}>
          <AdSearch />
          <Popover shadow='lg' withArrow>
            <Popover.Target>
              <Button variant='transparent'>
                <IconFilter />
              </Button>
            </Popover.Target>
            <Popover.Dropdown maw={{ base: "100%", sm: 700 }} w={700}>
              <AdFilters />
            </Popover.Dropdown>
          </Popover>
        </Flex>

        <Grid flex={1}>
          {!state.adsQueryState.isPending &&
            state.adsQueryState.data.data.ads.map((ad) => (
              <Grid.Col key={ad.id} span={{ base: 12, xs: 6, md: 4 }}>
                <AdCard {...ad} />
              </Grid.Col>
            ))}
          {state.adsQueryState.isPending && <Loader />}
        </Grid>
      </Stack>

      <Stack align='center' gap='sm'>
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
