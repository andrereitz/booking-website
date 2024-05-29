import React from 'react';

const useBookingContextMock = React.createContext({
  bookings: [{
    id: 112233,
    property: 1,
    from: '2024-6-1',
    to: '2024-6-7',
    total: 345.46
  }],
  addBooking: () => true,
  deleteBooking: () => true,
});

export default useBookingContextMock;