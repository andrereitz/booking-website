import { act, fireEvent, render, screen } from "@testing-library/react";
import { PropertyListing } from ".";
import { vi } from "vitest";

vi.mock('@/hooks/useBookingContext', () => ({
  useBooking: vi.fn(() => ({
    bookings: [
      {
        id: 111,
        property: 1,
        from: '2024-6-1',
        to: '2024-6-7',
        total: 345.46
      }
    ],
  }))
}));

describe('PropertyListing should render correctly', () => {
  it('should render with the correct information', async () => {
    render(<PropertyListing />)

    expect(screen.getByText('Available Properties')).toBeInTheDocument()
  })

  it('should open and close view modal', async () => {
    const { rerender } = render(<PropertyListing />)
    
    const card = screen.getAllByTestId('property-card');
    act(() => {
      fireEvent.click(card[0])
    })

    rerender(<PropertyListing />)

    const reservationBtn = screen.getByText('Make Reservation')
    expect(reservationBtn).toBeInTheDocument()

    const close = screen.getByTestId('close-button');
    act(() => {
      fireEvent.click(close)
    })

    expect(reservationBtn).not.toBeInTheDocument()
  })
})