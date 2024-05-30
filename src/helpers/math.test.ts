import { getDuration, getRatingDecimal, getServiceFee } from "./math"

describe('getRatingDecimal works correctly', () => {
  it('should return number decimal', () => {
    const result = getRatingDecimal(3.333)

    expect(result).toBe(33)
  })
  it('should return 0 if number has no decimal', () => {
    const result = getRatingDecimal(3)

    expect(result).toBe(0)
  })
})

describe('getServiceFee works correctly', () => {
  it('should return the correct service fee', () => {
    const result = getServiceFee(49)

    expect(result).toBe(7.35)
  })
  it('should return the correct service fee', () => {
    const result = getServiceFee(495.56)

    expect(result).toBe(74.33)
  })
})

describe('getDuration works correctly', () => {
  it('should return the correct duration provided a range', () => {
    const result = getDuration(new Date('2024-01-01'), new Date('2024-01-3'))

    expect(result).toBe(2)
  })
  it('should return undefined if one data is missing', () => {
    const result = getDuration(new Date('2024-01-01'))

    expect(result).toBe(undefined)
  })
})