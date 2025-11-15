import { Avatar, Badge, Group, Paper, Stack, Text, Timeline, Title } from "@mantine/core";
import { IconShieldCheck, IconShieldX } from "@tabler/icons-react";

import { AD_STATUS } from "@/shared/constants";
import { formatDateWithTime } from "@/shared/utils";

import styles from "./ModerationHistory.module.css";

interface IModerationHistoryProps {
  moderationHistory: ModerationHistoryItem[];
}

export const ModerationHistory = ({ moderationHistory }: IModerationHistoryProps) => (
  <Paper shadow='md' p='md' h='100%'>
    <Stack gap='md'>
      <Title order={2} size='h3'>
        История модерации
      </Title>

      <Timeline active={moderationHistory.length - 1} bulletSize={24} classNames={styles}>
        {moderationHistory.length === 0 && <Text>Это объявление не проходило модерацию</Text>}
        {moderationHistory.reverse().map((moderation) => (
          <Timeline.Item
            key={moderation.id}
            bullet={
              <Avatar color={moderation.action === "approved" ? "green" : "red"} variant='white'>
                {moderation.action === "approved" ? (
                  <IconShieldCheck size={20} />
                ) : (
                  <IconShieldX size={20} />
                )}
              </Avatar>
            }
            title={
              <Group justify='space-between'>
                <Text fw={600}>{moderation.moderatorName}</Text>
                <Badge
                  color={moderation.action === "approved" ? "green" : "red"}
                  variant='light'
                  size='sm'
                >
                  {AD_STATUS[moderation.action]}
                </Badge>
              </Group>
            }
          >
            <Stack gap='xs'>
              <Text size='sm' c='dimmed'>
                {formatDateWithTime(moderation.timestamp)}
              </Text>

              {moderation.reason && (
                <Text size='sm'>
                  <Text component='span' fw={600}>
                    Причина:
                  </Text>
                  {moderation.reason}
                </Text>
              )}

              <Text size='sm'>
                <Text component='span' fw={600}>
                  Комментарий:
                </Text>
                {moderation.comment}
              </Text>

              <Text size='xs' c='dimmed'>
                ID модератора: {moderation.moderatorId}
              </Text>
            </Stack>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  </Paper>
);
