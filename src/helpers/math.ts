export function getRatingDecimal(value: number): number {
  return value % 1 * 100;
}

export function getServiceFee(value: number): number {
  return  value * .15
}
