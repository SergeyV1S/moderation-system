import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (cause) => {
      const error = (cause as AxiosError<{ message: string }>).response;

      console.error(error?.data.message || "Неизвестная ошибка");
    }
  }),
  mutationCache: new MutationCache({
    onError: (cause) => {
      const error = (cause as AxiosError<{ message: string }>).response;

      console.error(error?.data.message || "Неизвестная ошибка");
    }
  })
});
