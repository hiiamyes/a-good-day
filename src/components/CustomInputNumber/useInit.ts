import { useEffect, useRef, useState } from 'react';
import { CustomInputNumberProps } from '.';

const useInit = (props: CustomInputNumberProps) => {
  const { min, max, step, value, disabled, onChange, onBlur } = props;
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const isIncrementDisabled = disabled || inputValue >= max;
  const isDecrementDisabled = disabled || inputValue <= min;

  const increment = () => {
    if (!inputRef.current) return;
    const newValue = +inputRef.current?.value + step;
    if (newValue > max) return;
    inputRef.current.value = newValue.toString();
    const event = new Event('input', { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>;
    Object.defineProperty(event, 'target', { value: inputRef.current });
    onChange(event);
    setInputValue(newValue);
  };

  const decrement = () => {
    if (!inputRef.current) return;
    const newValue = +inputRef.current?.value - step;
    if (newValue < min) return;
    inputRef.current.value = newValue.toString();
    const event = new Event('input', { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>;
    Object.defineProperty(event, 'target', { value: inputRef.current });
    onChange(event);
    setInputValue(newValue);
  };

  const onContainerBlur = () => {
    if (!inputRef.current) return;
    const event = new Event('blur', { bubbles: true }) as unknown as React.FocusEvent<HTMLInputElement>;
    Object.defineProperty(event, 'target', { value: inputRef.current });
    onBlur(event);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    if (newValue > max) return;
    if (newValue < min) return;
    onChange(e);
    setInputValue(newValue);
  };

  return {
    inputRef,
    inputValue,
    isIncrementDisabled,
    isDecrementDisabled,
    increment,
    decrement,
    onInputChange,
    onContainerBlur,
  };
};

export default useInit;
