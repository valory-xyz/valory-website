/**
 * @param dateString - date as a string (mm/dd/yyyy)
 * @returns formatted date string (mmm dd(, yyyy))
 * @example formatDate(11/13/2015) => Nov 13, 2015 OR formatDate(01/06/2025) => Jan 6
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  const newDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return date.getFullYear() === currentYear ? newDate.slice(0, -5) : newDate;
};
