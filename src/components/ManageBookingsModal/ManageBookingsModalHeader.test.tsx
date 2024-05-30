import { vi } from "vitest"
import { ManageBookingsModalHeader } from "./ManageBookingsModalHeader"
import { fireEvent, render, screen } from "@testing-library/react"

describe('ModalBookingsModalHeader should render correctly', () => {
  it('should render with title', async () => {
    render(<ManageBookingsModalHeader onClose={ vi.fn() } />)
    
    expect(await screen.findByText('Your Reservations')).toBeInTheDocument()
  })
  it('should fire close event', async () => {
    const closeMock = vi.fn()
    render(<ManageBookingsModalHeader onClose={ closeMock } />)

    const btn = await screen.getByRole('button');

    fireEvent.click(btn)
    expect(closeMock).toHaveBeenCalled()
  })
})