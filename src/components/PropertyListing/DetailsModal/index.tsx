import { ImageCover, RatingStars } from "@/components/shared";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PROPERTIES } from "@/data/properties";
import { AMENITIES } from "@/data/amenities";
import { BuildingIcon, HomeIcon } from "lucide-react";
import { DetailsModalHeader } from "./DetailsModalHeader";
import { DetailsModalSidebar } from "./DetailsModalSidebar";

export const DetailsModal = ({
  id,
  onClose
} : {
  id?: number,
  onClose: () => void
}) => {
  if(!id) return

  const property = PROPERTIES.filter(property => property.id === id)[0] || null;
  
  return(
    <div className="fixed inset-0 bg-white flex flex-col text-slate-800">
      <DetailsModalHeader title={property.title} onClose={onClose} />
      <div className="overflow-y-auto pb-4">
        <div className="container flex flex-col md:flex-row gap-4 pt-4">
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
              <RatingStars rating={property.rating} />
            </div>
            <div className="mt-4 text-slate-700">
              <h3 className="text-xl flex items-center gap-2 mt-5 mb-2 pb-2 border-b-slate-300 border-b"><HomeIcon size={22} /> {property.tagline}</h3>
              <p className="text-lg">
                {property.description}
              </p>
            </div>
            <div className="mt-4 text-slate-700">
              <h3 className="text-xl flex items-center gap-2 mt-5 mb-3 pb-2 border-b-slate-300 border-b"><BuildingIcon size={22} /> Ameneties </h3>
              <div className="text-lg grid grid-cols-1 md:grid-cols-2">
                {AMENITIES.map((am) => {
                  const { Icon } = am;
                  return (
                    <div key={`am-${am.id}`} className={`flex gap-3 ${property.amenities.includes(am.id) ? '' : 'line-through text-slate-400'}`}>
                      {Icon && (
                        <Icon />
                      )}
                      {am.title}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <DetailsModalSidebar price={property.price} id={property.id} onClose={onClose} />
        </div>
      </div>
    </div>
  )
}