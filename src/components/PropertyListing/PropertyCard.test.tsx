import { render, screen } from "@testing-library/react"
import { PropertyCard } from "./PropertyCard"
import { PROPERTIES } from "@/data/properties"

describe('PropertyCard should render correctly', () => {
  it('should render with the correct information', () => {
    render(<PropertyCard data={PROPERTIES[0]} onClick={() => true} />)

    expect(screen.getByText('Casa Cedro Azul. Pool, grill and wood-burning home')).toBeInTheDocument()
    expect(screen.getByText('$154.65 night')).toBeInTheDocument()

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/1-outdoor.webp')
  })
})