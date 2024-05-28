import { useBooking } from "@/hooks/useBookingContext";
import { Button } from "@/components/ui/button";

export const BookingIndicator = () => {
  const { bookings } = useBooking();

  if(bookings.length === 0) return;

  return(
    <div className='container my-4 flex justify-center'>
      <div className="rounded-md bg-cyan-600 flex p-4 gap-6 items-center">
        <p className="text-lg text-white">
          You have {bookings.length} reservation(s)
        </p>
        <Button 
          variant="outline"
          className="bg-transparent text-white"
        >
          Manage
        </Button>

      </div>
    </div>
  )
}