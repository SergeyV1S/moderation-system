export const formatDateWithTime = (timestamp: string) => {
  const formatedDate = new Date(timestamp).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return formatedDate;
};
