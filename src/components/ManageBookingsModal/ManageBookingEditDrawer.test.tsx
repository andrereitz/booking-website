import { vi } from "vitest"
import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react"
import { ManageBookingsEditDrawer } from "./ManageBookingsEditDrawer"
import { useBooking } from "@/hooks/useBookingContext";
import React, { act } from "react";

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
    updateBooking: vi.fn()  
  }))
}));

describe('ManageBookingsEditDrawer should render correctly', () => {
  it('should render with title', async () => {
    render(<ManageBookingsEditDrawer id={111} onClose={ vi.fn() } />)
    
    expect(screen.getByText('Edit booking')).toBeInTheDocument()
  })

  it('should close', async () => {
    const closeMock = vi.fn()
    render(<ManageBookingsEditDrawer id={111} onClose={ closeMock } />)

    const btn = screen.getByText('Cancel');

    fireEvent.click(btn)
    expect(closeMock).toHaveBeenCalled()
  })

  it('should update', async () => {
    render(<ManageBookingsEditDrawer id={111} onClose={ vi.fn() } />)
    const { result } = renderHook(() => useBooking());
    const updateBookingSpy = vi.spyOn(result.current, 'updateBooking');

    const btn = screen.getByText('Submit');
    act(() => {
      fireEvent.click(btn)
      result.current.updateBooking(111, '2024-5-31', '2024-6-5')
    })

    await waitFor(() => {
      expect(updateBookingSpy).toHaveBeenCalled()
    })
  })
})