import { render, screen } from "@testing-library/react"
import { DetailsModalBookingInfo } from "./DetailsModalBookingInfo"

describe('DetailsModalBookingInfo should render correctly', () => {
  it('should not render with missing data', () => {
    render(<DetailsModalBookingInfo price={100} />)

    expect(screen.queryByText('Total: $500.00')).not.toBeInTheDocument()
  })

  it('should render with all the data', () => {
    render(<DetailsModalBookingInfo duration={5} total={500} price={100} />)
      
    expect(screen.getByText('$100.00 X 5 night(s) = $500.00')).toBeInTheDocument()
    expect(screen.getByText('Service fee: $75.00')).toBeInTheDocument()
    expect(screen.queryByText('Total: $500.00')).toBeInTheDocument()
  })
})