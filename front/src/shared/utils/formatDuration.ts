export const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} ч ${minutes % 60} мин`;
  }
  return `${minutes} мин`;
};
