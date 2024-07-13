import RoomAllocation from '@/components/RoomAllocation';
import { fireEvent, render, screen } from '@testing-library/react';

const mockProps = {
  guest: { adult: 4, child: 2 },
  rooms: [
    { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
  ],
  onChange: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('RoomAllocation', () => {
  it('renders correctly with initial props', () => {
    render(<RoomAllocation {...mockProps} />);
    const {
      guest: { adult, child },
      rooms,
    } = mockProps;
    expect(screen.getByText(`住客人數：${adult} 位大人，${child} 位小孩 / ${rooms.length} 房`)).toBeInTheDocument();
    expect(screen.getByText('尚未分配人數：0 位大人，0 位小孩')).toBeInTheDocument();
  });

  it('renders correct number of room allocations', () => {
    render(<RoomAllocation {...mockProps} />);
    const roomTitles = screen.getAllByText(/房間：\d+ 人/);
    expect(roomTitles.length).toBe(3);
  });

  it('calls onChange when input value changes', () => {
    render(<RoomAllocation {...mockProps} />);
    const input = screen.getByRole('spinbutton', { name: 'room-1-adult-count' });
    fireEvent.change(input, { target: { value: '1' } });
    expect(mockProps.onChange).toHaveBeenCalledWith([
      { adult: 0, child: 0, price: 0 },
      { adult: 1, child: 0, price: 500 },
      { adult: 2, child: 2, price: 1500 },
    ]);
  });

  it('increments/decrements value when increment/decrement button is clicked', () => {
    render(<RoomAllocation {...mockProps} />);
    const input = screen.getByRole('spinbutton', { name: 'room-1-adult-count' });
    const decrementButton = screen.getByRole('button', { name: 'room-1-adult-decrement' });
    const inbcrementButton = screen.getByRole('button', { name: 'room-1-adult-increment' });
    fireEvent.click(decrementButton);
    expect(input).toHaveValue(1);
    fireEvent.click(inbcrementButton);
    expect(input).toHaveValue(2);
  });

  it('disable increment/decrement button correctly', () => {
    render(<RoomAllocation {...mockProps} />);
    const inbcrementButton = screen.getByRole('button', { name: 'room-1-child-increment' });
    const decrementButton = screen.getByRole('button', { name: 'room-1-child-decrement' });
    expect(inbcrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });
});
