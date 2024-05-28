import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import reactLogo from './assets/react.svg';

import { BookingIndicator } from '@/components/BookingIndicator';
import { PropertyListing } from '@/components/PropertyListing';

import { ToastContainer } from 'react-toastify';

function App() {
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
      <BookingIndicator />
      <PropertyListing />
      <ToastContainer autoClose={3000} position="bottom-right" theme='colored' />
    </>
  )
}

export default App
