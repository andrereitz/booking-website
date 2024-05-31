import { Calendar } from "@/components/ui/calendar"
import { SidebarItem } from "./SidebarItem"
import { Button } from "@/components/ui/button"
import { formatCurrency, getBaseDate } from "@/helpers/formatters"
import { CalendarFold, InfoIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"
import { useBooking } from "@/hooks/useBookingContext"
import { toast } from "react-toastify"
import { getDuration, getTotals } from "@/helpers/math"
import { DetailsModalBookingInfo } from "./DetailsModalBookingInfo"

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
  const { addBooking } = useBooking()

  const duration = useMemo<number | undefined>(() => {
    return getDuration(date?.from, date?.to)
  }, [date])

  const total = useMemo<number>(() => {
    const duration = getDuration(date?.from, date?.to);

    if (!duration) return 0;

    return getTotals(price, duration)
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
    <div className="w-full md:w-[400px] lg:w-[500px] flex flex-col gap-3" data-testid="details-modal-sidebar">
      <SidebarItem className="justify-center">
        <h3 className="flex gap-2 items-center border-b pb-2"><CalendarFold size={18} /> Select your dates</h3>
        <div className="flex justify-center items-center">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date()}}
            className="w-[275px]"
          />
        </div>
        <Button onClick={makeReservation}>
          Make Reservation
        </Button>
      </SidebarItem>
      <SidebarItem>
        <h3 className="flex gap-2 items-center border-b pb-2 mb-2"><InfoIcon size={18} /> Booking information</h3>
        <span className="font-bold">
          {formatCurrency(price)} night
        </span>
        <DetailsModalBookingInfo duration={duration} total={total} price={price} />
      </SidebarItem>
    </div>
  )
}
