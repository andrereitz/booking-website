import { formatCurrency } from "@/helpers/formatters"
import { getServiceFee } from "@/helpers/math"

export const DetailsModalBookingInfo = ({
  duration,
  price,
  total
} : {
  duration?: number,
  price: number,
  total?: number
}) => { 

  if(!total || !duration) return null

  return (
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
  )
}