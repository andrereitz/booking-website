import { formatCurrency, getBaseDate } from "./formatters" 

describe('formatters helpers works correctly', () => {
  it('should format currency correctly', () => {
    const result = formatCurrency(342.55)

    expect(result).toBe('$342.55')
  })
  it('should return a base date from a date object', () => {
    const date = new Date('Jan 30 2020');
    const result = getBaseDate(date.toString())

    expect(result).toBe('2020-1-30')
  })
})