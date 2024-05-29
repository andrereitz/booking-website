import { useBooking } from "@/hooks/useBookingContext";
import { ManageBookingsModalHeader } from "./ManageBookingsModalHeader"
import { PROPERTIES } from "@/data/properties";
import { ImageCover } from "../shared";
import { EditIcon, MapPinIcon } from "lucide-react";

export const ManageBookingsModal = ({
  open,
  onClose
} : {
  open: boolean,
  onClose: () => void
}) => {
  const { bookings } = useBooking();

  if(!open) return null;

  return(
    <div className="fixed inset-0 bg-white flex flex-col text-slate-800 h-[100vh] z-10">
      <ManageBookingsModalHeader open={open} onClose={onClose} />
      <div className="overflow-y-auto pb-4">
        <div className="container flex gap-4 pt-4">
          {bookings.map(booking => {
            const property = PROPERTIES.find(property => property.id === booking.property)
            if(!property) return null;

            const from = new Date(booking.from)
            const to = new Date(booking.to)

            return (
              <div key={booking.id} className="flex flex-wrap sm:flex-nowrap items-start rounded-md border border-slate-200 w-full">
                <div className="w-full sm:w-[300px] sm:flex-shrink-0">
                  <ImageCover url={`images/${property.images[0]}`} />
                </div>
                <div className="p-3 text-slate-700 flex-shrink">
                  <h2 className="text-lg font-bold">{property.title}</h2>
                  <h3 className="flex gap-2 items-center"><MapPinIcon size={18} />{property.tagline}</h3>
                  <div className="bg-slate-100 p-3 rounded-md">
                    {new Intl.DateTimeFormat('en-US').format(from)}
                    {new Intl.DateTimeFormat('en-US').format(to)}
                  </div>
                  <div>
                    <EditIcon />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}