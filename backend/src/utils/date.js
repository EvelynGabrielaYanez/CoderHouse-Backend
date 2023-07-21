export const subtractDays = (date, daysQty = 1) => new Date(date.setDate(date.getDate() - daysQty));
