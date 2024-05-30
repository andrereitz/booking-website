import { checkBookingsDates, checkDateInterval } from "./date"

describe('checkDateInterval helper works correctly', () => {
  it('Should return true for overlapping dates', () => {
    const result = checkDateInterval('2024-1-1', '2024-1-3', '2024-1-2', '2024-1-4')

    expect(result).toBe(true)
  })
  it('Should return false for non overlapping dates', () => {
    const result = checkDateInterval('2024-1-1', '2024-1-3', '2024-1-4', '2024-1-7')

    expect(result).toBe(false)
  })
  it('Should return false when the start date matches the end date of a existing reservation', () => {
    const result = checkDateInterval('2024-1-5', '2024-1-7', '2024-1-7', '2024-1-10')

    expect(result).toBe(false)
  })
  it('Should return false when the end date matches the start date of a existing reservation', () => {
    const result = checkDateInterval('2024-1-5', '2024-1-7', '2024-1-1', '2024-1-5')

    expect(result).toBe(false)
  })
})

describe('checkBookingsDates helper works correctly', () => {
  const mock = [
    {
      id: 111,
      property: 1,
      from: '2024-1-4',
      to: '2024-1-7',
      total: 800
    },
    {
      id: 222,
      property: 1,
      from: '2024-1-7',
      to: '2024-1-12',
      total: 1000
    }
  ]
  it('should return a match id and an error for overlappping dates', () => {
    const result = checkBookingsDates(mock, '2024-1-1', '2024-1-5')

    expect(result).toBe(true)
  })
  it('should return a match id and an error for overlappping dates', () => {
    const result = checkBookingsDates(mock, '2024-1-11', '2024-1-15')

    expect(result).toBe(true)
  })
  it('should not return a match id and an error if no overlappping dates', () => {
    const result = checkBookingsDates(mock, '2024-1-15', '2024-1-19')

    expect(result).toBe(false)
  })
})