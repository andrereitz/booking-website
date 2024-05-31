import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { useBooking } from "@/hooks/useBookingContext"
import { getBaseDate } from "@/helpers/formatters"
import { toast } from "react-toastify"

export const ManageBookingsEditDrawer = ({
 id,
 onClose
} : {
  id: number | null,
  onClose: () => void
}) => {
  const { bookings, updateBooking } = useBooking()

  const bookingCurrent = bookings.find(book => book.id === id)
  const initialRange = bookingCurrent ? {
    from: new Date(bookingCurrent?.from),
    to: new Date(bookingCurrent?.to)
  } : undefined;

  const [date, setDate] = useState<DateRange | undefined>(undefined)

  useEffect(() => {
    setDate(initialRange)
  }, [id])

  async function updateBookingAction() {
    if(!date || !date.from || !date.to || !id) return;

    const baseFrom = getBaseDate(date?.from.toDateString());
    const baseTo = getBaseDate(date?.to.toDateString());

    try {
      const booking = await updateBooking(id, baseFrom, baseTo)

      toast(String(booking), { type: "success" })
      onClose();

    } catch(err) {
      toast(String(err), { type: "error" })
    }
  }

  return(
    <Drawer open={id ? true : false} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit booking</DrawerTitle>
            <DrawerDescription>Change the dates of your stay.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex justify-center">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date()}}
              className="rounded-md"
            />
          </div>
          <DrawerFooter>
            <Button onClick={updateBookingAction}>Submit</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}