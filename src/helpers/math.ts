import { intervalToDuration } from "date-fns";

export function getRatingDecimal(value: number): number {
  return Math.round(value % 1 * 100);
}

export function getServiceFee(value: number): number {
  return  parseFloat((value * .15).toFixed(2))
}

export function getDuration(from?: Date, to?: Date): number | undefined {
  if(!from || !to) return undefined;
  
  return intervalToDuration({ start: from, end: to }).days
}

export function getTotals(price: number, duration: number): number {
  return (price * duration) + getServiceFee(price * duration)
}
