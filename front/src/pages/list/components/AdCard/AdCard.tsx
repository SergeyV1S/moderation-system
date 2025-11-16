import { Link, generatePath } from "react-router";

import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IconCategory, IconClock } from "@tabler/icons-react";

import { AD_STATUS, AD_STATUS_COLORS, PATHS, PRIORITY_COLORS } from "@/shared/constants";
import { formatDateWithoutTime, formatPrice } from "@/shared/utils";

type TAdCardProps = Ad;

export const AdCard = ({
  id,
  title,
  description,
  price,
  category,
  status,
  priority,
  createdAt,
  images
}: TAdCardProps) => (
  <Card shadow='sm' padding='lg' radius='md' withBorder>
    <Card.Section pos='relative'>
      <Image
        height={160}
        src={images[0]}
        fallbackSrc='https://cdn.vectorstock.com/i/500p/81/79/no-photo-icon-default-placeholder-vector-41468179.jpg'
        alt={`Фото товара ${title}`}
      />
      <Badge pos='absolute' top={12} right={12} color={PRIORITY_COLORS[priority]} variant='light'>
        {priority === "urgent" ? "Срочно" : "Обычный"}
      </Badge>
    </Card.Section>

    <Group align='center' justify='space-between' mt='sm'>
      <Text fw={700} size='xl' c='blue'>
        {formatPrice(price)}
      </Text>
      <Badge color={AD_STATUS_COLORS[status]}>{AD_STATUS[status]}</Badge>
    </Group>

    <Text size='lg' lineClamp={2} mt='xs'>
      {title}
    </Text>

    <Group gap='xs' mt='sm'>
      <Group gap={4}>
        <IconCategory size={14} color='var(--mantine-color-dimmed)' />
        <Text size='sm' c='dimmed'>
          {category}
        </Text>
      </Group>

      <Group gap={4}>
        <IconClock size={14} color='var(--mantine-color-dimmed)' />
        <Text size='sm' c='dimmed'>
          {formatDateWithoutTime(createdAt)}
        </Text>
      </Group>
    </Group>

    <Text size='sm' c='dimmed' lineClamp={3} mt='sm' style={{ flex: 1 }}>
      {description}
    </Text>

    <Button component={Link} to={generatePath(PATHS.ITEM_ID, { id })} fullWidth mt='md' radius='md'>
      Открыть
    </Button>
  </Card>
);
