import { render, screen } from "@testing-library/react"
import { RatingStars } from "./RatingStars"


describe('RatingStarts should render correctly', () => {
  it('should render the component with the correct number of stars', () => {
    const { container } = render(<RatingStars rating={2} />)
    const icons = container.querySelectorAll('svg')
    const iconsFaded = container.querySelectorAll('svg.opacity-50')

    expect(icons.length).toBe(5)
    expect(iconsFaded.length).toBe(3)
  })

  it('should render the component with the correct text', () => {
    render(<RatingStars rating={4} />)

    expect(screen.getByTestId('rating-text')).toHaveTextContent('Rating: 4')
  })

  it('should render star with half star if less than .5', () => {
    const { container } = render(<RatingStars rating={4.4} />)

    const halfStar = container.querySelector('.lucide-star-half');
    expect(halfStar).toBeInTheDocument()

    expect(screen.getByTestId('rating-text').textContent).toBe('Rating: 4.4')
  })

  it('should render star without half star if more than .5', () => {
    const { container } = render(<RatingStars rating={4.6} />)

    const halfStar = container.querySelector('.lucide-star-half');
    expect(halfStar).not.toBeInTheDocument()

    expect(screen.getByTestId('rating-text').textContent).toBe('Rating: 4.6')
  })
})