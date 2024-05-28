import { checkDateInterval } from "@/helpers/date";
import { Booking } from "@/types";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from "react";

export type BookingContextValues = Booking[]

type BookingDispatch = Dispatch<SetStateAction<Booking[]>>;
export type BookingContextType = [Booking[], BookingDispatch];

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBooking = () => {
  const context = useContext(BookingContext);

  if(!context) {
    throw new Error("useBooking hook must be used under a BookingContext!");
  }

  const [bookings, setBookings] = context;

  async function addBooking(propertyID: number, from: string, to: string): Promise<unknown> {
    console.log(propertyID, from, to)

    const newBooking: Booking = {
      id: new Date().getTime(),
      property: propertyID,
      dateFrom: from,
      dateTo: to
    }

    bookings.map(booking => {
      const isOverlapping = checkDateInterval(booking.dateFrom, booking.dateTo, from, to)

      if(isOverlapping) {
        throw 'Your already have a booking in this date'
      }
    })

    setBookings(prev => [...prev, newBooking])
    return 'Property booked sucessfully';
  }

  async function deleteBooking(key: string, value: unknown) {

    return null;
  }
  
  return {
    bookings,
    addBooking,
    deleteBooking,
  }
}

export const BookingContextProvider = ({ children } : {} & PropsWithChildren) => {
  const [state, setState] = useState<BookingContextValues>([]);
  const contextValue: [BookingContextValues, BookingDispatch] = useMemo(() => [state, setState], [state]);

  return <BookingContext.Provider value={contextValue}>{children}</BookingContext.Provider>
}