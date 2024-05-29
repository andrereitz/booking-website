import { checkDateInterval } from "./date"

describe('date helpers works correctly', () => {
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