import { PropertyType } from "@/data/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { formatCurrency } from "@/helpers/formatters"
import { ImageCover, RatingStars } from "@/components/shared"

export const PropertyCard = ({ 
  data,
  onClick, 
} : { 
  data: PropertyType,
  onClick: () => void,
}) => {
  return(
    <div key={data.id} className='flex flex-col' onClick={onClick}>
      <AspectRatio ratio={16 / 9}>
        <ImageCover url={`/images/${data.images[0]}`} />
      </AspectRatio>
      <div className='flex flex-col px-1'>
        <span className='whitespace-nowrap overflow-hidden text-ellipsis pt-2 font-bold'>
          {data.title}
        </span>
        <div className="flex justify-between">
          <span>
            {formatCurrency(data.price)} night
          </span>
          <span>
            <RatingStars rating={data.rating} showNumber={false} size={18} />
          </span>
        </div>
      </div>
    </div>
  )
}