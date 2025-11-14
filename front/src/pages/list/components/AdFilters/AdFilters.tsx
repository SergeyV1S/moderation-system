import {
  Button,
  Grid,
  Group,
  MultiSelect,
  RangeSlider,
  Select,
  Stack,
  Text,
  Title
} from "@mantine/core";

import { categoryOptions, sortByOptions, statusOptions } from "./constants";
import { useAdFilters } from "./hooks/useAdFilters";

export const AdFilters = () => {
  const { state, functions } = useAdFilters();

  return (
    <Stack gap='md' p='xs' w='100%'>
      <Title order={2} size='h3'>
        Фильтры
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Select
            label='Сортировать'
            placeholder='Выберите параметр'
            clearable
            comboboxProps={{ withinPortal: false }}
            data={sortByOptions}
            value={state.filters.sortBy}
            onChange={functions.handleSortByChange}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <MultiSelect
            label='Статусы'
            clearable
            placeholder={state.filters.statuses?.length ? "" : "Выберите статусы"}
            hidePickedOptions
            comboboxProps={{ withinPortal: false }}
            data={statusOptions}
            value={state.filters.statuses}
            onChange={functions.handleStatusChange}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Select
            label='Категория'
            placeholder='Выберите категорию'
            clearable
            comboboxProps={{ withinPortal: false }}
            data={categoryOptions}
            value={state.filters.categoryId}
            onChange={functions.handleCategoryChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Цена
            </Text>
            <RangeSlider
              min={0}
              max={100000}
              step={100}
              value={[state.filters.minPrice, state.filters.maxPrice]}
              onChange={functions.handlePriceChange}
            />
            <Group justify='space-between'>
              <Text size='sm'>От: {state.filters.minPrice} ₽</Text>
              <Text size='sm'>До: {state.filters.maxPrice} ₽</Text>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <Button variant='outline' onClick={functions.saveFilters} fullWidth>
            Сохранить
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <Button variant='outline' onClick={functions.resetFilters} fullWidth>
            Сбросить
          </Button>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
