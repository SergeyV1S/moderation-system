import dayjs from "dayjs";

export const formatDateParam = (searchParams: URLSearchParams, dateParamName: string) => {
  const paramValue = searchParams.get(dateParamName);
  return paramValue ? dayjs(+paramValue).format("YYYY-MM-DD") : undefined;
};
