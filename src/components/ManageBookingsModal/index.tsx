import { Button } from "@/components/ui/button";
import { PROPERTIES } from "@/data/properties";
import { formatCurrency } from "@/helpers/formatters";
import { useBooking } from "@/hooks/useBookingContext";
import { CalendarMinusIcon, CalendarPlusIcon, CircleDollarSignIcon, EditIcon, MapPinIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImageCover } from "../shared";
import { ManageBookingsEditDrawer } from "./ManageBookingsEditDrawer";
import { ManageBookingsModalHeader } from "./ManageBookingsModalHeader";
import { AspectRatio } from "../ui/aspect-ratio";
import { ManageBookingsDeleteConfirmation } from "./ManageBookingsDeleteConfirmation";

export const ManageBookingsModal = ({
  open,
  onClose
} : {
  open: boolean,
  onClose: () => void
}) => {
  const { bookings, deleteBooking } = useBooking();
  const [editBooking, setEditBooking] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | undefined>(undefined)

  async function deleteBookingAction(id: number) {
    try {
      const result = await deleteBooking(id);
      
      toast(String(result), { type: 'success' })
      
    } catch(err) {
      toast(String(err), { type: 'error' })
    } finally {
      setDeletingId(undefined)
    }
  }

  useEffect(() => {
    if(bookings.length === 0) {
      onClose()
    }
  }, [bookings])

  if(!open) return null;

  return(
    <div className="fixed inset-0 bg-white flex flex-col text-slate-800 h-[100vh] z-10">
      <ManageBookingsModalHeader onClose={onClose} />
      <div className="overflow-y-auto pb-4">
        <div className="container flex flex-col gap-4 pt-4 items-center">
          {bookings.map((booking, index) => {
            const property = PROPERTIES.find(property => property.id === booking.property)
            if(!property) return null;

            const from = new Date(booking.from)
            const to = new Date(booking.to)

            return (
              <div key={booking.id} className="flex flex-wrap sm:flex-nowrap items-start rounded-md border border-slate-200 w-full max-w-[800px]">
                <div className="w-full sm:w-[300px] sm:flex-shrink-0">
                  <AspectRatio ratio={16 / 10}>
                    <ImageCover url={`images/${property.images[0]}`} />
                  </AspectRatio>
                </div>
                <div className="p-3 text-slate-700 flex-shrink flex flex-col self-stretch w-full">
                  <h2 className="text-lg font-bold">{property.title}</h2>
                  <h3 className="flex gap-2 items-center"><MapPinIcon size={18} />{property.tagline}</h3>
                  <div className="bg-slate-100 p-3 mt-3 rounded-md flex gap-4 justify-around">
                    <span className="flex gap-2 items-center">
                      <CircleDollarSignIcon size={18} />
                      {formatCurrency(booking.total)}
                    </span>
                    <span className="flex gap-2 items-center">
                      <CalendarPlusIcon size={18} />
                      {new Intl.DateTimeFormat('en-US').format(from)}
                    </span>
                    <span className="flex gap-2 items-center">
                      <CalendarMinusIcon size={18} />
                      {new Intl.DateTimeFormat('en-US').format(to)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-3 mt-auto" data-testid="actions">
                    <Button 
                      variant="ghost" 
                      className="hover:text-red-500" 
                      onClick={() => setDeletingId(booking.id)} 
                      data-testid={`delete-button-${index}`}
                    >
                      <TrashIcon />
                    </Button>
                    <Button variant="ghost" onClick={() => setEditBooking(booking.id)} data-testid={`edit-button-${index}`}>
                      <EditIcon />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
            <ManageBookingsDeleteConfirmation 
              id={deletingId} 
              onClose={() => setDeletingId(undefined)} 
              onConfirm={() => deletingId && deleteBookingAction(deletingId)}
            />
        </div>
      </div>
      <ManageBookingsEditDrawer id={editBooking} onClose={() => setEditBooking(null)} />
    </div>
  )
}