import { Guest, Room, Allocation } from '@/types';

interface AllocationResult {
  allocations: Allocation[];
  totalPrice: number;
}

interface Cache {
  [key: string]: AllocationResult;
}

const getDefaultRoomAllocation = (guest: Guest, rooms: Room[]): Allocation[] => {
  const cache: Cache = {};

  const allocateRoom = (roomIndex: number, remainingAdult: number, remainingChild: number): AllocationResult => {
    const key = `${roomIndex}-${remainingAdult}-${remainingChild}`;
    if (cache[key]) return cache[key];
    if (roomIndex === rooms.length) {
      if (remainingAdult === 0 && remainingChild === 0) {
        return { allocations: [], totalPrice: 0 };
      } else {
        return { allocations: [], totalPrice: Infinity };
      }
    }

    const { roomPrice, adultPrice, childPrice, capacity } = rooms[roomIndex];
    let allocationResult: AllocationResult = {
      allocations: [],
      totalPrice: Infinity,
    };

    for (let adult = 0; adult <= capacity; adult++) {
      for (let child = 0; child <= capacity - adult; child++) {
        if (adult > remainingAdult) continue;
        if (child > remainingChild) continue;
        if (adult === 0 && child > 0) continue;

        const nextAllocationResult = allocateRoom(roomIndex + 1, remainingAdult - adult, remainingChild - child);

        const price = adult === 0 && child === 0 ? 0 : roomPrice + adultPrice * adult + childPrice * child;
        const totalPrice = price + nextAllocationResult.totalPrice;

        if (totalPrice < allocationResult.totalPrice) {
          allocationResult = {
            allocations: [{ adult, child, price }, ...nextAllocationResult.allocations],
            totalPrice,
          };
        }
      }
    }

    cache[key] = allocationResult;
    return allocationResult;
  };

  const { allocations, totalPrice } = allocateRoom(0, guest.adult, guest.child);
  if (totalPrice === Infinity) return rooms.map(() => ({ adult: 0, child: 0, price: 0 }));
  return allocations;
};

export default getDefaultRoomAllocation;
