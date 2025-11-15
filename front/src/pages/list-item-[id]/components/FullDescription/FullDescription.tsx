import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Spoiler,
  Stack,
  Table,
  Text,
  Title
} from "@mantine/core";
import { IconCalendar, IconClock, IconMessage, IconPlus, IconStar } from "@tabler/icons-react";

import { formatDateWithTime } from "@/shared/utils";

import styles from "./FullDescription.module.css";

interface IFullDescriptionProps extends Ad {}

export const FullDescription = (ad: IFullDescriptionProps) => {
  const characteristicsTableHeads = Object.keys(ad.characteristics);
  const characteristicsTableRows = Object.values(ad.characteristics);

  return (
    <Paper shadow='md' p='md' h='100%'>
      <Stack gap='lg'>
        <Title order={2} size='h3' px='md'>
          Полное описание
        </Title>

        <Stack px='md'>
          <Group gap='xs'>
            <Text fw={600}>Название:</Text>
            <Text> {ad.title}</Text>
          </Group>
          <Spoiler maxHeight={20} showLabel='Показать' hideLabel='Спрятать'>
            <Text fw={600}>Описание:</Text>
            <Text>{ad.description}</Text>
          </Spoiler>
        </Stack>

        <Accordion
          multiple
          classNames={{ chevron: styles.chevron }}
          chevron={<IconPlus className={styles.icon} />}
        >
          <Accordion.Item value='characteristics'>
            <Accordion.Control>Характеристики</Accordion.Control>
            <Accordion.Panel>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    {characteristicsTableHeads.map((head) => (
                      <Table.Th key={head}>{head}</Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    {characteristicsTableRows.map((row) => (
                      <Table.Td key={row}> {row}</Table.Td>
                    ))}
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value='seller'>
            <Accordion.Control>Продавец</Accordion.Control>
            <Accordion.Panel>
              <Stack gap='md'>
                <Group>
                  <Avatar color='blue' size='lg' radius='xl'>
                    {ad.seller.name
                      .split(" ")
                      .map((char) => char[0])
                      .join("")}
                  </Avatar>
                  <Stack gap={2}>
                    <Text fw={600} size='lg'>
                      {ad.seller.name}
                    </Text>
                    <Badge variant='outline' color='gray'>
                      ID: {ad.seller.id}
                    </Badge>
                  </Stack>
                </Group>

                <Paper withBorder p='md' radius='md'>
                  <Text fw={600} mb='sm'>
                    Статистика
                  </Text>
                  <SimpleGrid cols={2} spacing='sm'>
                    <Stack gap={2}>
                      <Text size='sm' c='dimmed'>
                        Всего объявлений
                      </Text>
                      <Text fw={600} size='lg'>
                        {ad.seller.totalAds}
                      </Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text size='sm' c='dimmed'>
                        Рейтинг
                      </Text>
                      <Group gap='xs'>
                        <IconStar
                          size={16}
                          color='var(--mantine-color-yellow-6)'
                          fill='var(--mantine-color-yellow-6)'
                        />
                        <Text fw={600} size='lg'>
                          {ad.seller.rating}/5
                        </Text>
                      </Group>
                    </Stack>
                  </SimpleGrid>
                </Paper>

                <Group grow>
                  <Group gap='xs'>
                    <IconCalendar size={16} />
                    <Text size='sm' fw={600}>
                      Дата регистрации:
                    </Text>
                    <Text size='sm'>{formatDateWithTime(ad.seller.registeredAt)}</Text>
                  </Group>

                  <Group gap='xs'>
                    <IconClock size={16} />
                    <Text size='sm' fw={600}>
                      Опыт:
                    </Text>
                    <Text size='sm'>
                      {Math.floor(
                        (new Date().getTime() - new Date(ad.seller.registeredAt).getTime()) /
                          (1000 * 60 * 60 * 24 * 30)
                      )}{" "}
                      месяцев
                    </Text>
                  </Group>
                </Group>

                <Button variant='light' leftSection={<IconMessage size={16} />} fullWidth>
                  Связаться с продавцом
                </Button>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Paper>
  );
};
