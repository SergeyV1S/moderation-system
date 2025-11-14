import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";

import { AD_STATUS } from "@/constants";

import styles from "./AdCard.module.css";

type TAdCardProps = Ad;

const STATUS_COLOR = {
  pending: "yellow",
  rejected: "red",
  approved: "green"
};

export const AdCard = ({ title, description, status, images }: TAdCardProps) => (
  <Card shadow='sm' padding='lg' radius='md' withBorder>
    <Card.Section>
      <Image src={images[0]} height={160} alt={`Фото товара ${title}`} />
    </Card.Section>

    <Group className={styles.title_group}>
      <Text fw={500} flex={1} truncate>
        {title}
      </Text>
      <Badge color={STATUS_COLOR[status]}>{AD_STATUS[status]}</Badge>
    </Group>

    <Text size='sm' c='dimmed'>
      {description}
    </Text>

    <Button fullWidth mt='md' radius='md'>
      Открыть
    </Button>
  </Card>
);
