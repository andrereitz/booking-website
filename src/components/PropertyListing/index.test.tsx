import { render, screen } from "@testing-library/react"
import { PropertyListing } from "."

describe('PropertyListing should render correctly', () => {
  it('should render with the correct information', async () => {
    render(<PropertyListing />)

    expect(screen.getByText('Available Properties')).toBeInTheDocument()
  })
})