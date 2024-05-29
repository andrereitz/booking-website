import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { BookingIndicator } from '.';
import { useBooking } from '@/hooks/useBookingContext';

vi.mock('@/hooks/useBookingContext')

describe('DetailsModalHeader renders correctly', () => {
  it('should render message and open modal', () => {
    vi.mocked(useBooking).mockReturnValue({ 
      bookings: [
        {
          id: 112233,
          property: 1,
          from: '2024-6-1',
          to: '2024-6-7',
          total: 345.46
        }
      ],
      addBooking: vi.fn(),
      deleteBooking: vi.fn(),
    })

    const mockManage = vi.fn();
    render(<BookingIndicator onManage={ mockManage } />);

    expect(screen.getByText('You have 1 reservation(s)')).toBeInTheDocument();

    const btn = screen.getByRole('button')
    fireEvent.click(btn)

    expect(mockManage).toHaveBeenCalledTimes(1)
  })

  it('should render two items', () => {
    vi.mocked(useBooking).mockReturnValue({ 
      bookings: [
        {
          id: 112233,
          property: 1,
          from: '2024-6-1',
          to: '2024-6-7',
          total: 345.46
        },
        {
          id: 44555,
          property: 2,
          from: '2024-6-1',
          to: '2024-6-7',
          total: 500
        },
      ],
      addBooking: vi.fn(),
      deleteBooking: vi.fn(),
    })

    render(<BookingIndicator onManage={ vi.fn() } />);

    expect(screen.getByText('You have 2 reservation(s)')).toBeInTheDocument();
  })

  it('should not render if no items', () => {
    vi.mocked(useBooking).mockReturnValue({ 
      bookings: [],
      addBooking: vi.fn(),
      deleteBooking: vi.fn(),
    })

    render(<BookingIndicator onManage={ vi.fn() } />);

    expect(screen.queryByText('Manage')).not.toBeInTheDocument();
  })
});