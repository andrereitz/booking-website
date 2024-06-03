import { Booking } from '@/types'
import { addDays, eachDayOfInterval, isSameDay, isWithinInterval, subDays } from 'date-fns'

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

  const eachDay = eachDayOfInterval( {start: new Date(from), end:  new Date(to)} )
  const eachDayCurrent = eachDayOfInterval( {start: new Date(currentFrom), end:  new Date(currentTo)} )
  let eachOverlap = false

  eachDay.map((day, index) => {
    eachDayCurrent.find((dayCurrent, indexCurrent) => {
      if(index == eachDay.length - 1 && indexCurrent == 0) return;
      if(index == 0 && indexCurrent == eachDayCurrent.length - 1) return;

      if(isSameDay(dayCurrent, day)) {
        eachOverlap = true;
      }
    })
  })

  if(isToWithinInterval) return true

  return (isFromWithinInterval || isToWithinInterval || eachOverlap)
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