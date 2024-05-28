import reactLogo from './assets/react.svg';
import './App.css';

import { PROPERTIES } from './data/properties';
import { PropertyCard } from './components/PropertyListing';
import { DetailsModal } from './components/DetailsModal';
import { useState } from 'react';

function App() {
  const [propertyView, setPropertyView] = useState<number | undefined>(undefined)

  console.log(PROPERTIES)
  return (
    <>
      <div className="w-full py-4">
        <h1 className="flex items-center justify-center gap-3">
            <img className='w-[50px]' src={reactLogo} /> 
            <span className="text-4xl">
              Booking React
            </span>
        </h1>
      </div>
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
    </>
  )
}

export default App
