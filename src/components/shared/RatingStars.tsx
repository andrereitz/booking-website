import { getRatingDecimal } from "@/helpers/math";
import { StarHalf, StarIcon } from "lucide-react"

export const RatingStars = ({
  rating,
  showNumber = true,
  size = 24
} : {
  rating: number,
  showNumber?: boolean,
  size?: number
}) => {
  const absolutes = Math.floor(rating);
  const decimals = getRatingDecimal(rating);
  const absArray = Array.from({ length: absolutes }, (_, index) => index);
  const offsetArray = Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => index);

  return(
    <div className="w-full flex">
      {absArray.map((_, index) => (<StarIcon key={`star-${index}`} size={size} />))}
      {decimals > 0 && decimals <= 50 && (
        <>
          <StarHalf size={size} />
          <StarHalf className={`scale-x scale-x-[-1] opacity-50 ml-[-${size}px]`} size={size} />
        </>
      )}
      {decimals > 0 && decimals >= 50 && (
        <>
          <StarIcon size={size} />
        </>
      )}
      {offsetArray.map((_, index) => <StarIcon key={`star-offset-${index}`} className="opacity-50" size={size} />)}
      {showNumber && (
        <span className="ml-2">
          Rating: {rating}
        </span>
      )}
    </div>
  )
}