import { Booking } from '@/types'
import { addDays, isWithinInterval, subDays } from 'date-fns'
import { OverlapMatch } from './types'

/**
 * Customer should be able to do a reservation for the same day he is going to check out of another
 * Customer should also be able to do a reservation where the end date starts a new reservation
 * 
 * @param from Start date for a booked date
 * @param to End date for a booked date
 * @param currentFrom Start date to compare
 * @param currentTo End date to compare
 * @returns {boolean} True if overlaps, false if not
 */
export function checkDateInterval(from: string, to: string, currentFrom: string, currentTo: string): boolean{
  const isFromWithinInterval = isWithinInterval(new Date(currentFrom), { start: new Date(from), end: subDays(new Date(to), 1) })
  const isToWithinInterval = isWithinInterval(new Date(currentTo), { start: addDays(new Date(from), 1), end: new Date(to) })

  return (isFromWithinInterval || isToWithinInterval)
}

export function checkBookingsDates(bookings: Booking[], from: string, to: string, ignoreID?: number): boolean {
  const check = bookings.some(booking => {
    const isOverlapping = checkDateInterval(booking.from, booking.to, from, to)

    if(ignoreID && booking.id === ignoreID) {
      return false
    }

    if(isOverlapping) {
      return true;
    }

    return false
  })

  return check;
}