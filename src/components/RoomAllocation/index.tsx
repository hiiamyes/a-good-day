import React from 'react';
import CustomInputNumber from '@/components/CustomInputNumber';
import useInit from './useInit';
import { Guest, Room, Allocation } from '@/types';

export interface RoomAllocationProps {
  guest: Guest;
  rooms: Room[];
  onChange: (allocations: Allocation[]) => void;
}

const INPUT_NUMBER_SETP = 1;

const RoomAllocation: React.FC<RoomAllocationProps> = (props) => {
  const { rooms } = props;
  const { title, remainingString, allocations, onAllocationChange, remainingAdult, remainingChild } = useInit(props);

  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="text-xl font-bold">{title}</div>
      <div className="rounded border border-sky-100 bg-sky-50 p-5">{remainingString}</div>
      {rooms.map((room, roomIndex) => {
        const { capacity } = room;
        const { adult, child } = allocations[roomIndex];
        const title = `房間：${adult + child} 人`;
        const adultMax = Math.min(capacity - child, adult + remainingAdult);
        const adultMin = 0;
        const adultDisabled = false;
        const childMax = Math.min(capacity - adult, child + remainingChild);
        const childMin = 0;
        const childDisabled = false;

        return (
          <div key={roomIndex} className="grid gap-3 border-b pb-2 last:border-0" aria-label={`room-${roomIndex}`}>
            <div className="text-lg font-bold">{title}</div>
            <div className="flex items-center justify-between">
              <div>
                <div>大人</div>
                <div className="text-gray-400">年齡 20+</div>
              </div>
              <CustomInputNumber
                min={adultMin}
                max={adultMax}
                step={INPUT_NUMBER_SETP}
                name={`room-${roomIndex}-adult`}
                value={adult}
                disabled={adultDisabled}
                onChange={onAllocationChange(roomIndex, 'adult')}
                onBlur={() => {}}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>小孩</div>
              <CustomInputNumber
                min={childMin}
                max={childMax}
                step={INPUT_NUMBER_SETP}
                name={`room-${roomIndex}-child`}
                value={child}
                disabled={childDisabled}
                onChange={onAllocationChange(roomIndex, 'child')}
                onBlur={() => {}}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomAllocation;
