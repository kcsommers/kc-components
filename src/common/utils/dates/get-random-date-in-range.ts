export const getRandomDateInRange = (
  startDate: Date,
  endDate: Date
): number => {
  const _diff: number = endDate.getTime() - startDate.getTime();
  return new Date(Math.random() * _diff + startDate.getTime()).getTime();
};
