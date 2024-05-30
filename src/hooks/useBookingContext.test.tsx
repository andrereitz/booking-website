import { vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useBooking, BookingContextProvider } from '@/hooks/useBookingContext';

describe('useBooking hook should work correclty', () => {

  it('should throw if useBooking is not inside BookingContext', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useBooking());
    }).toThrow('useBooking hook must be used under a BookingContext!');

    consoleErrorSpy.mockRestore();

  })

  it('should add new booking if addBooking function is called', async () => {
    const wrapper = ({children}: {children: any}) => <BookingContextProvider>{children}</BookingContextProvider>
    const { result } = renderHook(() => useBooking(), { wrapper });
  
    act(() => {
      result.current.addBooking(1, 345, '2024-5-30', '2024-6-5');
    })

    expect(result.current.bookings[0].property).toBe(1)
    expect(result.current.bookings[0].total).toBe(345)
    expect(result.current.bookings[0].from).toBe('2024-5-30')
    expect(result.current.bookings[0].to).toBe('2024-6-5')
  });

  it('should throw if overlapping information is sent', async () => {
    const wrapper = ({children}: {children: any}) => <BookingContextProvider>{children}</BookingContextProvider>
    const { result } = renderHook(() => useBooking(), { wrapper });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      await act(async () => {
        await result.current.addBooking(1, 345, '2024-5-30', '2024-6-5');
      });
      
      const response = await act(async () => {
        await result.current.addBooking(2, 360, '2024-5-30', '2024-6-5');
      });
  
      throw response;

    } catch (error) {
      expect(error).toBe('Your already have a booking in this date');
    }

    consoleErrorSpy.mockRestore();
  });

  it('should delete a booking', async () => {
    const wrapper = ({children}: {children: any}) => <BookingContextProvider>{children}</BookingContextProvider>
    const { result } = renderHook(() => useBooking(), { wrapper });

    result.current.bookings.push({id: 1, property: 1, total: 345, from: '2024-5-30', to: '2024-6-5'})
    
    act(() => {
      result.current.deleteBooking(1)
    })

    expect(result.current.bookings.length).toBe(0)
  })
  
  it('should update a booking', async () => {
    const wrapper = ({children}: {children: any}) => <BookingContextProvider>{children}</BookingContextProvider>
    const { result } = renderHook(() => useBooking(), { wrapper });

    result.current.bookings.push({id: 1, property: 1, total: 345, from: '2024-5-30', to: '2024-6-5'})
    
    act(() => {
      result.current.updateBooking(1, '2024-6-4', '2024-6-10')
    })

    expect(result.current.bookings[0].from).toBe('2024-6-4')
    expect(result.current.bookings[0].to).toBe('2024-6-10')
  })
})