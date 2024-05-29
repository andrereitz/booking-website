export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

/**
 * Send base dates to database instead of UTC in ISO 8601
 * to avoid offset problems in multiple timezones.
 * The time is not relevant for the booking, the day, month and year are.
 */
export function getBaseDate(date: string): string {
  const nDate = new Date(date);
  const year = nDate.getFullYear()
  const month = nDate.getMonth()
  const day = nDate.getDate()

  return `${year}-${month + 1}-${day}`
}