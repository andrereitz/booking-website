import { ImageCover } from "@/components/shared";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PROPERTIES } from "@/data/properties";
import { CalendarFold, HomeIcon, InfoIcon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, intervalToDuration } from "date-fns";
import { SidebarItem } from "./SidebarItem";
import { formatCurrency } from "@/helpers/formatters";

export const DetailsModal = ({
  id,
  onClose
} : {
  id?: number,
  onClose: () => void
}) => {
  if(!id) return

  // const initialRange: DateRange = {
  //   from: new Date(),
  //   to: addDays(new Date(), 3)
  // }

  
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [duration, setDuration] = useState<number | null>(null)
  const property = PROPERTIES.filter(property => property.id === id)[0] || null;

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
  return(
    <div className="fixed inset-0 bg-white flex flex-col text-slate-800">
      <div className="flex gap-3 items-center border-b-slate-300 border-b mb-2 p-4">
        <h2 className="overflow-hidden overflow-ellipsis text-lg font-bold pl-2 whitespace-nowrap">
          {property.title}
        </h2>
        <Button variant={"ghost"} onClick={onClose} className="ml-auto" >
          <XIcon />
        </Button>
      </div>
      <div className="overflow-y-auto">

        <div className="container flex gap-4 mt-2">
          <div className="w-full">
            <div>
              <AspectRatio ratio={16 / 9}>
                <ImageCover url={`/images/${property.images[0]}`} />
              </AspectRatio>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {property.images.map((image: string, index: number) => {
                  if (index == 0) return;
                  
                  return(
                    <div key={image} className="bg-slate-200">
                      <AspectRatio ratio={16 / 9}>
                        <ImageCover url={`/images/${image}`} />
                      </AspectRatio>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-4 text-slate-700">
              <h3 className="text-xl flex items-center gap-2 mb-2"><HomeIcon size={22} /> {property.tagline}</h3>
              <p className="text-lg">
                {property.description}
              </p>
            </div>
            <div className="h-[1000px]">
              text example
            </div>
          </div>
          <div className="w-[400px] sticky top-0 flex flex-col gap-3">
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
                {formatCurrency(property.price)} night
              </span>
              {duration && (
                <>
                  <span>
                    {formatCurrency(property.price)} X {duration} night(s) = {formatCurrency(property.price * duration)}
                  </span>
                  <span>
                    Service fee: {formatCurrency(property.price * .15)}
                  </span>
                  <span className="border-t pt-1 mt-1">
                    Total: {formatCurrency((property.price * duration) + property.price * .15)}
                  </span>
                </>
              )}
            </SidebarItem>
          </div>
        </div>
      </div>
    </div>
  )
}