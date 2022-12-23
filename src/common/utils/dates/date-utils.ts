export const MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const MONTHS_ABREVIATED: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const DAYS: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const DAYS_ABREVIATED: string[] = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

export type DateDisplayType =
  | 'year'
  | 'month'
  | 'month-short'
  | 'date'
  | 'day'
  | 'day-short'
  | 'full'
  | 'month dd, yyyy'
  | 'mm/dd/yyyy';

export const getDateDisplay = (
  dateInput: Date | number,
  displayType: DateDisplayType = 'full'
) => {
  if (!dateInput) {
    return '';
  }
  if (typeof dateInput === 'number') {
    dateInput = new Date(dateInput);
  }
  const year = dateInput.getFullYear();
  const month = dateInput.getMonth();
  const day = dateInput.getDay();
  const date = dateInput.getDate();

  switch (displayType) {
    case 'year':
      return String(year);
    case 'month':
      return MONTHS[month];
    case 'month-short':
      return MONTHS_ABREVIATED[month];
    case 'date':
      return String(date);
    case 'day':
      return DAYS[day];
    case 'day-short':
      return DAYS_ABREVIATED[day];
    case 'full':
      return `${DAYS[day]} ${MONTHS[month]} ${date}, ${year}`;
    case 'month dd, yyyy':
      return `${MONTHS[month]} ${date}, ${year}`;
    case 'mm/dd/yyyy':
      return `${month + 1}/${date}/${year}`;
    default:
      return '--';
  }
};

export const getRandomDate = (): number => {
  return new Date(Math.random() * new Date().getTime()).getTime();
};

export const getRandomDateInRange = (
  startDate: Date,
  endDate: Date
): number => {
  const _diff: number = endDate.getTime() - startDate.getTime();
  return new Date(Math.random() * _diff + startDate.getTime()).getTime();
};
