import React, { useEffect, useState } from "react";

import { Button, Group, Paper, Stack, Switch, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBellOff, IconCheck, IconInfoTriangle } from "@tabler/icons-react";

import { notificationService } from "../offline-mode/notificationService";

export const NotificationPermission: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    setPermission(Notification.permission);

    if (notificationService.isSupported()) {
      const subscription = await notificationService.getCurrentSubscription();
      setIsSubscribed(!!subscription);
    }
  };

  const handleEnableNotifications = async () => {
    if (!notificationService.isSupported()) {
      notifications.show({
        message: "Ваш браузер не поддерживает уведомления",
        c: "red",
        icon: <IconBellOff />
      });
      return;
    }

    setIsLoading(true);

    try {
      const newPermission = await notificationService.requestPermission();
      setPermission(newPermission);

      if (newPermission === "granted") {
        const subscription = await notificationService.subscribeToPush();

        if (subscription) {
          await notificationService.sendSubscriptionToServer(subscription);
          setIsSubscribed(true);
          notifications.show({
            message: "Уведомления включены!",
            c: "green",

            icon: <IconCheck />
          });
        }
      } else {
        notifications.show({
          message: "Разрешение на уведомления не получено",
          c: "yellow",
          icon: <IconInfoTriangle />
        });
      }
    } catch (error) {
      notifications.show({
        title: error.message,
        message: "Ошибка при включении уведомлений",
        c: "red",
        icon: <IconInfoTriangle />
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setIsLoading(true);

    try {
      await notificationService.unsubscribeFromPush();
      setIsSubscribed(false);
      notifications.show({
        message: "Уведомления отключены",
        c: "green",
        icon: <IconCheck />
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    await notificationService.showLocalNotification("Тестовое уведомление", {
      body: "Это тестовое уведомление от вашего PWA",
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png"
    });
  };

  if (!notificationService.isSupported()) {
    return (
      <Paper p='md' withBorder>
        <Text c='dimmed'>Ваш браузер не поддерживает push-уведомления</Text>
      </Paper>
    );
  }

  return (
    <Paper p='md' withBorder pos='sticky' left={0} top={0}>
      <Stack>
        <Group>
          <div>
            <Text fw={500}>Push-уведомления</Text>
            <Text size='sm' c='dimmed'>
              Статус:{" "}
              {permission === "granted"
                ? "Разрешено"
                : permission === "denied"
                  ? "Запрещено"
                  : "Не решено"}
            </Text>
          </div>

          <Switch
            checked={isSubscribed}
            onChange={(event) =>
              event.currentTarget.checked
                ? handleEnableNotifications()
                : handleDisableNotifications()
            }
            disabled={isLoading || permission === "denied"}
          />
        </Group>

        {permission !== "granted" && !isSubscribed && (
          <Button
            onClick={handleEnableNotifications}
            loading={isLoading}
            disabled={permission === "denied"}
          >
            Включить уведомления
          </Button>
        )}

        {permission === "granted" && isSubscribed && (
          <Group>
            <Button variant='outline' onClick={handleTestNotification} disabled={isLoading}>
              Тестовое уведомление
            </Button>
            <Button
              variant='outline'
              color='red'
              onClick={handleDisableNotifications}
              loading={isLoading}
            >
              Отключить
            </Button>
          </Group>
        )}

        {permission === "denied" && (
          <Text size='sm' c='red'>
            Вы запретили уведомления. Разрешите их в настройках браузера.
          </Text>
        )}
      </Stack>
    </Paper>
  );
};
