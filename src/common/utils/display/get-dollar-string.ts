import { commafyNumber } from './commafy-number';

export const getDollarString = (num: number, showZero = true) => {
  if (isNaN(+num)) {
    return showZero ? '$0' : '';
  }

  let safeNum = Math.max(0, +num / 100);
  if (safeNum % 1 === 0) {
    return `$${commafyNumber(safeNum)}`;
  }

  return `$${commafyNumber(parseFloat(String(safeNum)).toFixed(2))}`;
};
