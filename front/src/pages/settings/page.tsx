import { Flex, Stack, Title } from "@mantine/core";

import { NotificationPermission } from "@/shared/components";

const SettingsPage = () => (
  <Flex direction='column' mih='90vh'>
    <Stack gap='lg' flex={1}>
      <Title order={1} size='h2'>
        Настройки
      </Title>
      <NotificationPermission />
    </Stack>
  </Flex>
);

export default SettingsPage;
