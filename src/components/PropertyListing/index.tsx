import { useState } from "react";
import { DetailsModal } from "./DetailsModal";
import { PropertyCard } from "./PropertyCard";

import { PROPERTIES } from '@/data/properties';

export const PropertyListing = () => {
  const [propertyView, setPropertyView] = useState<number | undefined>(undefined)

  return (
    <div className='container mt-4'>
      <h2 className='text-2xl py-3 text-center'>Available Properties</h2>
      <div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 cursor-pointer'
      >
        {PROPERTIES.map(property => (
          <PropertyCard 
            key={property.id} 
            data={property} 
            onClick={() => setPropertyView(property.id)}
          />
        ) )}
      </div>
      <DetailsModal 
        id={propertyView}
        onClose={() => setPropertyView(undefined)}
      />
    </div>

  )
}
