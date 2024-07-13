import { Allocation } from '@/types';
import { cloneDeep, sumBy } from 'lodash-es';
import { useState } from 'react';
import { RoomAllocationProps } from '.';
import getDefaultRoomAllocation from './utils/getDefaultRoomAllocation';

const useInit = (props: RoomAllocationProps) => {
  const { guest, rooms, onChange } = props;
  const [allocations, setAllocations] = useState<Allocation[]>(getDefaultRoomAllocation(guest, rooms));

  const onAllocationChange =
    (roomIndex: number, type: 'adult' | 'child') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAllocations = cloneDeep(allocations);
      const { roomPrice, adultPrice, childPrice } = rooms[roomIndex];
      newAllocations[roomIndex][type] = +e.target.value;
      const { adult, child } = newAllocations[roomIndex];
      newAllocations[roomIndex].price =
        adult === 0 && child === 0 ? 0 : roomPrice + adult * adultPrice + child * childPrice;
      setAllocations(newAllocations);
      onChange(newAllocations);
    };

  const remainingAdult = guest.adult - sumBy(allocations, 'adult');
  const remainingChild = guest.child - sumBy(allocations, 'child');
  const title = `住客人數：${guest.adult} 位大人，${guest.child} 位小孩 / ${rooms.length} 房`;
  const remainingString = `尚未分配人數：${remainingAdult} 位大人，${remainingChild} 位小孩`;

  return {
    title,
    remainingString,
    allocations,
    onAllocationChange,
    remainingAdult,
    remainingChild,
  };
};

export default useInit;
