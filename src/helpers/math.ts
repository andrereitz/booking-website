export function getRatingDecimal(value: number): number {
  return Math.round(value % 1 * 100);
}

export function getServiceFee(value: number): number {
  return  parseFloat((value * .15).toFixed(2))
}
