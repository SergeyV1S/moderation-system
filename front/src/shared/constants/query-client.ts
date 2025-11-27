import { notifications } from "@mantine/notifications";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (cause) => {
      const error = (cause as AxiosError<{ message: string }>).response;

      notifications.show({
        title: "Произошла ошибка",
        color: "red",
        message: error.data.message || "Неизвестаная ошибка"
      });
    }
  }),
  mutationCache: new MutationCache({
    onError: (cause) => {
      const error = (cause as AxiosError<{ message: string }>).response;

      notifications.show({
        title: "Произошла ошибка",
        color: "red",
        message: error.data.message || "Неизвестаная ошибка"
      });
    }
  })
});
