import { Link } from "react-router";

import { Avatar, Button, Group, Menu, Text } from "@mantine/core";
import {
  IconChartBar,
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconUser
} from "@tabler/icons-react";

import { PATHS } from "@/shared/constants";

export const Header = () => (
  <Group component='header' justify='space-between' w='100%' h={60}>
    <Text to={PATHS.LIST} component={Link} fw={700} variant='gradient'>
      Логотип
    </Text>
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button variant='subtle' rightSection={<IconChevronDown size={14} />}>
          <Avatar size='sm' radius='xl' color='blue'>
            <IconUser size={16} />
          </Avatar>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Приложение</Menu.Label>
        <Menu.Item component={Link} to={PATHS.STATS} leftSection={<IconChartBar size={14} />}>
          Моя статистика
        </Menu.Item>
        <Menu.Item component={Link} to={PATHS.SETTINGS} leftSection={<IconSettings size={14} />}>
          Настройка
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Аккаунт</Menu.Label>
        <Menu.Item leftSection={<IconLogout size={14} />} color='red'>
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </Group>
);
