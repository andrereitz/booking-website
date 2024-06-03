import { vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
        property: 2,
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

  it('should open and close edit drawer', async () => {
    render(<ManageBookingsModal open={true} onClose={ vi.fn() } />);

    const editButton = screen.getByTestId('edit-button-0');
    act(() => {
      fireEvent.click(editButton)
    })
    
    expect(screen.getByText('Edit booking')).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel')
    act(() => {
      fireEvent.click(cancelButton)
    })    
  })

  it('should cancel delete action', async () => {
    render(<ManageBookingsModal open={true} onClose={ vi.fn() } />);

    const deleteButton = screen.getByTestId('delete-button-0');
    act(() => {
      fireEvent.click(deleteButton);
    })

    const confirmationDialog = screen.getByText('Are you sure?')
    expect(confirmationDialog).toBeInTheDocument()
    
    const cancelBtn = screen.getByTestId('delete-cancel');
    act(() => {
      fireEvent.click(cancelBtn);
    })

    expect(confirmationDialog).not.toBeInTheDocument()
  })

  it('should confirm delete action', async () => {
    const { rerender } = render(<ManageBookingsModal open={true} onClose={ vi.fn() } />);

    const deleteButton = screen.getByTestId('delete-button-0');
    act(() => {
      fireEvent.click(deleteButton);
    })

    const confirmBtn = screen.getByTestId('delete-confirm');
    act(() => {
      fireEvent.click(confirmBtn);
    })

    const confirmationDialog = screen.getByText('Are you sure?')
    expect(confirmationDialog).toBeInTheDocument()
    
    rerender(<ManageBookingsModal open={true} onClose={ vi.fn() } />)

    await waitFor(() => {
      expect(confirmationDialog).not.toBeInTheDocument()
    }, { interval: 100 })
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