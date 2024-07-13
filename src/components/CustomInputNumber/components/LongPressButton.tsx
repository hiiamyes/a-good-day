import { useLongPress } from '@uidotdev/usehooks';
import { useRef } from 'react';

export interface LongPressButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  ariaLabel: string;
  callback: () => void;
}

const INTERVAL_MS = 150;
const LONG_PRESS_THRESHOLD = 150;

const LongPressButton: React.FC<LongPressButtonProps> = (props) => {
  const { children, disabled, ariaLabel, callback } = props;
  const interval = useRef<NodeJS.Timeout | null>(null);

  const longPressAttrs = useLongPress(() => {}, {
    onStart: () => {
      interval.current = setInterval(callback, INTERVAL_MS);
    },
    onFinish: () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    },
    onCancel: () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    },
    threshold: LONG_PRESS_THRESHOLD,
  });

  return (
    <button
      className="flex h-12 w-12 items-center justify-center rounded border border-sky-500 outline-none hover:bg-sky-50 focus:outline focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
      {...longPressAttrs}
      onClick={callback}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default LongPressButton;
