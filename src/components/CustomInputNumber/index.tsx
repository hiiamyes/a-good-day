import LongPressButton from './components/LongPressButton';
import DecrementIcon from './components/DecrementIcon';
import IncrementIcon from './components/IncrementIcon';
import useInit from './useInit';

export interface CustomInputNumberProps {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = (props) => {
  const { min, max, step, name, disabled } = props;
  const {
    inputRef,
    inputValue,
    isIncrementDisabled,
    isDecrementDisabled,
    increment,
    decrement,
    onInputChange,
    onContainerBlur,
  } = useInit(props);

  return (
    <div className="flex items-center gap-2" onBlur={onContainerBlur}>
      <LongPressButton disabled={isDecrementDisabled} callback={decrement} ariaLabel={`${name}-decrement`}>
        <DecrementIcon />
      </LongPressButton>
      <input
        className="h-12 w-12 rounded border border-gray-400 text-center focus:border-sky-500 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="number"
        aria-label={`${name}-count`}
        ref={inputRef}
        min={min}
        max={max}
        step={step}
        name={name}
        value={inputValue}
        disabled={disabled}
        onChange={onInputChange}
      />
      <LongPressButton disabled={isIncrementDisabled} callback={increment} ariaLabel={`${name}-increment`}>
        <IncrementIcon />
      </LongPressButton>
    </div>
  );
};

export default CustomInputNumber;
