import { Calendar } from "@/components/ui/calendar"
import { SidebarItem } from "./SidebarItem"
import { Button } from "@/components/ui/button"
import { formatCurrency, getBaseDate } from "@/helpers/formatters"
import { CalendarFold, InfoIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { intervalToDuration } from "date-fns"
import { DateRange } from "react-day-picker"
import { useBooking } from "@/hooks/useBookingContext"
import { toast } from "react-toastify"
import { getServiceFee } from "@/helpers/math"

export const DetailsModalSidebar = ({
  id,
  price,
  onClose
} : {
  id: number,
  price: number,
  onClose: () => void
}) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const { addBooking, bookings } = useBooking()

  console.log('### bookings', bookings)

  const duration = useMemo<number | undefined>(() => {
    if(!date || !date.from || !date.to) return undefined;

    return intervalToDuration({ start: new Date(date?.from), end: new Date(date?.to) }).days
  }, [date])

  const total = useMemo<number>(() => {
    if (!duration) return 0;

    return (price * duration) + getServiceFee(price * duration);
  }, [date])

  async function makeReservation() {
    if(!date || !date.from || !date.to) return;

    const baseFrom = getBaseDate(date?.from.toDateString());
    const baseTo = getBaseDate(date?.to.toDateString());

    try {
      const booking = await addBooking(id, total, baseFrom, baseTo)

      toast(String(booking), { type: "success" })
      onClose();

    } catch(err) {
      toast(String(err), { type: "error" })
    }
  }

  return (
    <div className="w-full md:w-[400px] lg:w-[500px] flex flex-col gap-3">
      <SidebarItem>
        <h3 className="flex gap-2 items-center border-b pb-2"><CalendarFold size={18} /> Select your dates</h3>
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          disabled={{ before: new Date()}}
          className="rounded-md"
        />
        <Button onClick={makeReservation}>
          Make Reservation
        </Button>
      </SidebarItem>
      <SidebarItem>
        <h3 className="flex gap-2 items-center border-b pb-2 mb-2"><InfoIcon size={18} /> Booking information</h3>
        <span className="font-bold">
          {formatCurrency(price)} night
        </span>
        {duration && (
          <>
            <span>
              {formatCurrency(price)} X {duration} night(s) = {formatCurrency(price * duration)}
            </span>
            <span>
              Service fee: {formatCurrency(getServiceFee(price * duration))}
            </span>
            <span className="border-t pt-1 mt-1">
              Total: {formatCurrency(total)}
            </span>
          </>
        )}
      </SidebarItem>
    </div>
  )
}
