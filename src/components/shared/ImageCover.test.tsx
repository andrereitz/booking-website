import { render } from "@testing-library/react"
import { ImageCover } from "./ImageCover"


describe('ImageCover should render correctly', () => {
  it('should render the component with the correct src', () => {
    const { container } = render(<ImageCover url='testurl.com/image.jpg' />)
    const img = container.querySelector('img')

    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'testurl.com/image.jpg')
  })
})