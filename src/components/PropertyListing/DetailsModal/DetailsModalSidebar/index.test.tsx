import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { useBooking } from '@/hooks/useBookingContext';

import { DetailsModalSidebar } from './index';
import React from 'react';

vi.mock('@/hooks/useBookingContext', () => ({
  useBooking: vi.fn(() => ({
    bookings: [{
      id: 112233,
      property: 1,
      from: '2024-6-1',
      to: '2024-6-7',
      total: 345.46
    }],
    addBooking: () => true,
  }))
}));

describe('renders DetailsModal correctly', () => {
  it('should render Sidebar', () => {
    render(<DetailsModalSidebar id={1} price={100} onClose={() => true} />);

    expect(screen.getByTestId('details-modal-sidebar')).toBeInTheDocument();
  })
  it('should create a reservation', () => {
    render(<DetailsModalSidebar id={1} price={100} onClose={() => true} />);
    const { result } = renderHook(() => useBooking());
    const addBookingSpy = vi.spyOn(result.current, 'addBooking');

    const mockSetState = vi.fn();
    const mockState = {
      from: '2024-5-31',
      to: '2024-6-5'
    };

    vi.spyOn(React, 'useState').mockImplementation(() => [mockState, mockSetState]);

    const reservationButton = screen.getByText('Make Reservation')
    fireEvent.click(reservationButton)

    act(() => {
      result.current.addBooking(2, 200, '2024-10-20', '2024-10-25')
    })

    expect(addBookingSpy).toHaveBeenCalledTimes(1);
  })
});