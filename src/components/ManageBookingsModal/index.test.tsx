import { vi } from "vitest";
import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { ManageBookingsModal } from ".";
import { useBooking } from "@/hooks/useBookingContext";

vi.mock('@/hooks/useBookingContext', () => ({
  useBooking: vi.fn(() => ({
    bookings: [
      {
        id: 111,
        property: 1,
        from: '2024-6-1',
        to: '2024-6-7',
        total: 345.46
      },
      {
        id: 222,
        property: 1,
        from: '2024-6-8',
        to: '2024-6-15',
        total: 200
      }
    ],
    deleteBooking: vi.fn(() => Promise.resolve('Deleted sucessfully')),
  }))
}));

describe('ManageBookingsModal should render correctly', () => {
  it('should render booking information', async () => {
    render(<ManageBookingsModal open={true} onClose={ vi.fn() } />)

    expect(screen.getByText('$200.00')).toBeInTheDocument()
    expect(screen.getByText('6/15/2024')).toBeInTheDocument()
    expect(screen.getByText('6/7/2024')).toBeInTheDocument()
  })

  it('should call deleteBooking', async () => {
    render(<ManageBookingsModal open={true} onClose={ vi.fn() } />);
    const { result } = renderHook(() => useBooking());
    const deleteBookingSpy = vi.spyOn(result.current, 'deleteBooking');
    const { bookings } = result.current;

    const deleteButton = screen.getByTestId('delete-button-1');
    act(() => {
      fireEvent.click(deleteButton);
      result.current.deleteBooking(111)
    })
    
    await waitFor(() => {
      expect(deleteBookingSpy).toHaveBeenCalled();
      expect(deleteBookingSpy).toHaveBeenCalledWith(bookings[0].id);
    });
  })

  it('should close if no items', async () => {
    vi.mocked(useBooking).mockReturnValue({ 
      bookings: [],
      addBooking: vi.fn(),
      deleteBooking: vi.fn(),
      updateBooking: vi.fn(),
    })

    const mockClose = vi.fn()
    render(<ManageBookingsModal open={true} onClose={ mockClose } />)

    expect(mockClose).toHaveBeenCalled()
  })

  it('should not render if not open', async () => {
    render(<ManageBookingsModal open={false} onClose={ vi.fn() } />)

    expect(screen.queryByText('Your Reservations')).not.toBeInTheDocument()
  })
})