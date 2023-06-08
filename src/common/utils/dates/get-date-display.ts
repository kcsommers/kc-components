import { DateDisplayType } from './date-display-type';
import { DAYS, DAYS_ABREVIATED } from './days';
import { MONTHS, MONTHS_ABREVIATED } from './months';

export const getDateDisplay = (
  dateInput: Date | number,
  displayType: DateDisplayType = 'full'
) => {
  if (!dateInput) {
    return '';
  }

  const dateModel = new Date(dateInput);
  const year = dateModel.getFullYear();
  const month = dateModel.getMonth();
  const day = dateModel.getDay();
  const date = dateModel.getDate();

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
