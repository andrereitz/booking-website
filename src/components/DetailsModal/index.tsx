import { ImageCover } from "@/components/shared";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PROPERTIES } from "@/data/properties";
import { CalendarFold, HomeIcon, InfoIcon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, intervalToDuration } from "date-fns";
import { SidebarItem } from "./DetailsModalSidebar/SidebarItem";
import { formatCurrency } from "@/helpers/formatters";
import { DetailsModalHeader } from "./DetailsModalHeader";
import { DetailsModalSidebar } from "./DetailsModalSidebar";
import { RatingStars } from "../shared/RatingStars";

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

  const property = PROPERTIES.filter(property => property.id === id)[0] || null;
  
  return(
    <div className="fixed inset-0 bg-white flex flex-col text-slate-800 shadow-sm">
      <DetailsModalHeader title={property.title} onClose={onClose} />
      <div className="overflow-y-auto">
        <div className="container flex gap-4 pt-4">
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
              <h3 className="text-xl flex items-center gap-2 mb-2"><HomeIcon size={22} /> {property.tagline}</h3>
              <p className="text-lg">
                {property.description}
              </p>
            </div>
            <div className="h-[1000px]">
              text example
            </div>
          </div>
          <DetailsModalSidebar price={property.price} />
        </div>
      </div>
    </div>
  )
}