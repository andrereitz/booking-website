import { PROPERTIES } from "@/data/properties";
import { checkBookingsDates, checkDateInterval } from "@/helpers/date";
import { getDuration, getTotals } from "@/helpers/math";
import { Booking } from "@/types";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type BookingDispatch = Dispatch<SetStateAction<Booking[]>>;
export type BookingContextType = [Booking[], BookingDispatch];

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBooking = () => {
  const context = useContext(BookingContext);

  if(!context) {
    throw new Error("useBooking hook must be used under a BookingContext!");
  }

  const [bookings, setBookings] = context;

  async function addBooking(propertyID: number, total: number, from: string, to: string): Promise<unknown> {
    console.log(propertyID, from, to)

    const newBooking: Booking = {
      id: new Date().getTime(),
      property: propertyID,
      from: from,
      to: to,
      total
    }

    try {
      const match = checkBookingsDates(bookings, from, to)

      if(match) {
        throw 'Your already have a booking in this date';
      }

    } catch(err) {
      throw err;
    }

    setBookings(prev => [...prev, newBooking])
    return 'Property booked sucessfully';
  }

  async function deleteBooking(id: number) {
    setBookings(prev => prev.filter(booking => booking.id !== id))

    return 'Deleted sucessfully';
  }

  async function updateBooking(id: number, from: string, to: string) {
    const bookingData = bookings.filter(book => book.id === id)[0];
    const propertyData = PROPERTIES.filter(prop => prop.id === bookingData.property)[0];
    const duration = getDuration(new Date(from), new Date(to));

    if(!duration || !propertyData) {
      throw 'Error getting property data';
    }

    const newBookingData = {
      ...bookingData,
      from: from,
      to: to,
      total: getTotals(propertyData.price, duration)
    }

    try {
      const match = checkBookingsDates(bookings, from, to, id)

      if(match) {
        throw 'Your already have a booking in this date';
      }

    } catch(err) {
      throw err;
    }

    setBookings(prev => prev.map(book => {
        if(book.id === id) {
          book.from = newBookingData.from,
          book.to = newBookingData.to,
          book.total = newBookingData.total
        }

        return book
    }))

    return 'Updated sucessfully';
  }
  
  return {
    bookings,
    addBooking,
    deleteBooking,
    updateBooking
  }
}

export const BookingContextProvider = ({ children } : {} & PropsWithChildren) => {
  const [state, setState] = useState<Booking[]>([]);
  const contextValue: [Booking[], BookingDispatch] = useMemo(() => [state, setState], [state]);

  return <BookingContext.Provider value={contextValue}>{children}</BookingContext.Provider>
}