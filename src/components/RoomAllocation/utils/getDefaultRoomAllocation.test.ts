import getDefaultRoomAllocation from './getDefaultRoomAllocation';
import { Guest, Room, Allocation } from '@/types';

describe('getDefaultRoomAllocation', () => {
  test('Case 1', () => {
    const guest: Guest = { adult: 4, child: 2 };
    const rooms: Room[] = [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
      { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
    ];

    const expectedAllocations: Allocation[] = [
      { adult: 0, child: 0, price: 0 },
      { adult: 2, child: 0, price: 1000 },
      { adult: 2, child: 2, price: 1500 },
    ];

    const result = getDefaultRoomAllocation(guest, rooms);
    expect(result).toEqual(expectedAllocations);
  });

  test('Case 2', () => {
    const guest: Guest = { adult: 16, child: 0 };
    const rooms: Room[] = [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ];

    const expectedAllocations: Allocation[] = [
      { adult: 4, child: 0, price: 2500 },
      { adult: 4, child: 0, price: 2500 },
      { adult: 8, child: 0, price: 4000 },
      { adult: 0, child: 0, price: 0 },
    ];

    const result = getDefaultRoomAllocation(guest, rooms);
    expect(result).toEqual(expectedAllocations);
  });

  test('Case 3', () => {
    const guest: Guest = { adult: 0, child: 1 };
    const rooms: Room[] = [
      { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 2 },
      { roomPrice: 500, adultPrice: 400, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    ];

    const expectedAllocations: Allocation[] = [
      { adult: 0, child: 0, price: 0 },
      { adult: 0, child: 0, price: 0 },
      { adult: 0, child: 0, price: 0 },
    ];

    const result = getDefaultRoomAllocation(guest, rooms);
    expect(result).toEqual(expectedAllocations);
  });
});
