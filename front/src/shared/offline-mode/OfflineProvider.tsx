import { useEffect } from "react";

import { notifications } from "@mantine/notifications";
import { IconCheck, IconPlugOff } from "@tabler/icons-react";

import { useOnlineStatus } from "../hooks";

export const OfflineProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOnline, wasOfflineRef } = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) {
      notifications.show({
        title: "Отсутствует подключение к интернету.",
        color: "yellow",
        icon: <IconPlugOff size={18} />,
        message: "Вы находитесь в оффлайн-режиме. Некоторые функции могут быть недоступны."
      });
    } else if (wasOfflineRef.current) {
      notifications.show({
        title: "Подключение восстановлено!",
        color: "green",
        icon: <IconCheck size={18} />,
        message: "Вы снова в сети!"
      });
    }
  }, [isOnline]);

  return children;
};
