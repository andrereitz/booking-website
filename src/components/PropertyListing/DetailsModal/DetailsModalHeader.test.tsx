import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { DetailsModalHeader } from './DetailsModalHeader';

describe('DetailsModalHeader renders correctly', () => {
  it('should render title', () => {
    render(<DetailsModalHeader title="test title" onClose={ () => true } />);

    expect(screen.getByText('test title')).toBeInTheDocument();
  })
  it('should call the close button fn', () => {
    const mockFunction = vi.fn();
    render(<DetailsModalHeader title="test title" onClose={ mockFunction } />);

    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  })
});