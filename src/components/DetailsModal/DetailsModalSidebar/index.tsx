import { Calendar } from "@/components/ui/calendar"
import { SidebarItem } from "./SidebarItem"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/formatters"
import { CalendarFold, InfoIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { intervalToDuration } from "date-fns"
import { DateRange } from "react-day-picker"

export const DetailsModalSidebar = ({
  price,
} : {
  price: number
}) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [duration, setDuration] = useState<number | null>(null)

  function onDateChange(): void {
    if(!date || !date.from || !date.to) return setDuration(null);
    
    const duration = intervalToDuration({ start: new Date(date?.from), end: new Date(date?.to) })

    if(!duration.days) {
      return setDuration(null);
    }

    return setDuration(duration.days);
  }

  useEffect(() => {
    const nights = onDateChange()

    console.log(nights)
  }, [date])

  console.log('### selected date', date)

  return (
    <div className="w-full md:w-[400px] lg:w-[500px] flex flex-col gap-3">
      <SidebarItem>
        <h3 className="flex gap-2 items-center border-b pb-2"><CalendarFold size={18} /> Select your dates</h3>
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
        />
        <Button>
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
              Service fee: {formatCurrency(price * .15)}
            </span>
            <span className="border-t pt-1 mt-1">
              Total: {formatCurrency((price * duration) + price * .15)}
            </span>
          </>
        )}
      </SidebarItem>
    </div>
  )
}