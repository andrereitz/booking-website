import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { DetailsModal } from './index';
import { PROPERTIES } from '@/data/properties';

vi.mock('@/hooks/useBookingContext', () => ({
  useBooking: vi.fn(() => ({
    bookings: [{
      id: 112233,
      property: 1,
      from: '2024-6-1',
      to: '2024-6-7',
      total: 345.46
    }],
    addBooking: () => true,
  }))
}));


describe('DetailsModal renders correctly', () => {
  it('should render item', () => {
    render(<DetailsModal id={1} onClose={() => true} />);

    expect(screen.getByText(PROPERTIES[0].title)).toBeInTheDocument();
  })

  it('should render item', () => {
    render(<DetailsModal id={1} onClose={() => true} />);

    expect(screen.getByText(PROPERTIES[0].title)).toBeInTheDocument();
  })
});