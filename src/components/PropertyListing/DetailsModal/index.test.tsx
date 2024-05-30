import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { useBooking } from '@/hooks/useBookingContext';
import useBookingContextMock from '@/__mocks__/useBookingContextMock'

import { DetailsModal } from './index';

// vi.mock('@/hooks/useBookingContext', () => ({
//   __esModule: true,
//   default: useBookingContextMock,
// }));

// vi.mock('@hooks/useBooking', () => ({
//   useBooking: vi.fn(() => [])
// }));

describe('renders DetailsModal correctly', () => {
  it('should render title', () => {
    // render(<DetailsModal id={1} onClose={() => true} />);

    // screen.debug()

    // expect(screen.getByText('test title')).toBeInTheDocument();
  })
});