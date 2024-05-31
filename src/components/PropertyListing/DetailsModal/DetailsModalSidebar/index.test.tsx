import { useBooking } from '@/hooks/useBookingContext';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { DetailsModalSidebar } from './index';

vi.mock('@/hooks/useBookingContext', () => ({
  useBooking: vi.fn(() => ({
    bookings: [{
      id: 112233,
      property: 1,
      from: '2024-6-1',
      to: '2024-6-7',
      total: 345.46
    }],
    addBooking: vi.fn(),
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

    const reservationButton = screen.getByText('Make Reservation')
    fireEvent.click(reservationButton)

    act(() => {
      result.current.addBooking(2, 200, '2024-10-20', '2024-10-25')
    })

    expect(addBookingSpy).toHaveBeenCalledTimes(1);
  })

  it('should execute reservation', async () => {
    const { rerender } = render(<DetailsModalSidebar id={1} price={100} onClose={() => true} />);

    const nextMonthBtn = screen.getByRole('button', { name: "Go to next month" })
    act(() => {
      fireEvent.click(nextMonthBtn)
    })

    rerender(<DetailsModalSidebar id={1} price={100} onClose={() => true} />)

    expect(screen.getByText('June 2024')).toBeInTheDocument()

    const day1btn = screen.getAllByText('14');
    const day2btn = screen.getAllByText('16');
    const enabledDay1= day1btn.filter((button) => !(button as HTMLButtonElement).disabled);
    const enabledDay2= day2btn.filter((button) => !(button as HTMLButtonElement).disabled);
    const day1click = enabledDay1[0];
    const day2click = enabledDay2[0];

    act(() => {
      fireEvent.click(day1click)
    })
    act(() => {
      fireEvent.click(day2click)
    })

    rerender(<DetailsModalSidebar id={1} price={100} onClose={() => true} />)

    expect(day1click).toHaveAttribute('aria-selected')
    expect(day2click).toHaveAttribute('aria-selected')

    const reservationButton = screen.getByText('Make Reservation');
    act(() => {
      fireEvent.click(reservationButton)
    })

    expect(screen.getByText('$100.00 X 2 night(s) = $200.00')).toBeInTheDocument()
    expect(screen.getByText('Service fee: $30.00')).toBeInTheDocument()
    expect(screen.getByText('Total: $230.00')).toBeInTheDocument()  
  })
});