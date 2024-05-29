import { getRatingDecimal, getServiceFee } from "./math"

describe('getRatingDecimal works correctly', () => {
  it('should return number decimal', () => {
    const result = getRatingDecimal(3.333)

    expect(result).toBe(33)
    console.log('### result', result)
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