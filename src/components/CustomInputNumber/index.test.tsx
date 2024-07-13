import { fireEvent, render, screen } from '@testing-library/react';
import CustomInputNumber from '.';

const mockProps = {
  min: 0,
  max: 10,
  step: 1,
  name: 'test-input',
  value: 5,
  disabled: false,
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('CustomInputNumber', () => {
  it('renders correctly with initial props', () => {
    render(<CustomInputNumber {...mockProps} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(5);
  });

  it('calls onChange when input value changes', () => {
    render(<CustomInputNumber {...mockProps} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '6' } });
    const changeEvent = mockProps.onChange.mock.calls[0][0];
    expect(mockProps.onChange).toHaveBeenCalled();
    expect(changeEvent.target.name).toBe('test-input');
    expect(changeEvent.target.value).toBe('6');
  });

  it('calls onChange when increment button is clicked', () => {
    render(<CustomInputNumber {...mockProps} />);
    const incrementButton = screen.getByRole('button', { name: 'test-input-increment' });
    fireEvent.click(incrementButton);
    const changeEvent = mockProps.onChange.mock.calls[0][0];
    expect(mockProps.onChange).toHaveBeenCalled();
    expect(changeEvent.target.name).toBe('test-input');
    expect(changeEvent.target.value).toBe('6');
  });

  it('calls onChange when decrement button is clicked', () => {
    render(<CustomInputNumber {...mockProps} />);
    const decrementButton = screen.getByRole('button', { name: 'test-input-decrement' });
    fireEvent.click(decrementButton);
    const changeEvent = mockProps.onChange.mock.calls[0][0];
    expect(mockProps.onChange).toHaveBeenCalled();
    expect(changeEvent.target.name).toBe('test-input');
    expect(changeEvent.target.value).toBe('4');
  });

  it('disables increment button when value is equal to max', () => {
    render(<CustomInputNumber {...mockProps} value={10} />);
    const incrementButton = screen.getByRole('button', { name: 'test-input-increment' });
    fireEvent.click(incrementButton);
    expect(incrementButton).toBeDisabled();
    expect(mockProps.onChange).not.toHaveBeenCalled();
  });

  it('disables decrement button when value is equal to min', () => {
    render(<CustomInputNumber {...mockProps} value={0} />);
    const decrementButton = screen.getByRole('button', { name: 'test-input-decrement' });
    fireEvent.click(decrementButton);
    expect(decrementButton).toBeDisabled();
    expect(mockProps.onChange).not.toHaveBeenCalled();
  });

  it('disables input and buttons when disabled is true', () => {
    render(<CustomInputNumber {...mockProps} disabled={true} />);
    const input = screen.getByRole('spinbutton');
    const incrementButton = screen.getByRole('button', { name: 'test-input-decrement' });
    const decrementButton = screen.getByRole('button', { name: 'test-input-decrement' });
    expect(input).toBeDisabled();
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });

  it('calls onBlur when input loses focus', () => {
    render(<CustomInputNumber {...mockProps} />);
    const inputElement = screen.getByRole('spinbutton');
    fireEvent.blur(inputElement);
    expect(mockProps.onBlur).toHaveBeenCalled();
    const blurEvent = mockProps.onBlur.mock.calls[0][0];
    expect(blurEvent.target.name).toBe('test-input');
    expect(blurEvent.target.value).toBe('5');
  });

  it('calls onBlur when button loses focus', () => {
    render(<CustomInputNumber {...mockProps} />);
    const incrementButton = screen.getByRole('button', { name: 'test-input-decrement' });
    fireEvent.blur(incrementButton);
    expect(mockProps.onBlur).toHaveBeenCalled();
    const blurEvent = mockProps.onBlur.mock.calls[0][0];
    expect(blurEvent.target.name).toBe('test-input');
    expect(blurEvent.target.value).toBe('5');
  });

  it('aceep onBlur when button loses focus', () => {
    render(<CustomInputNumber {...mockProps} />);
    const incrementButton = screen.getByRole('button', { name: 'test-input-decrement' });
    fireEvent.blur(incrementButton);
    expect(mockProps.onBlur).toHaveBeenCalled();
    const blurEvent = mockProps.onBlur.mock.calls[0][0];
    expect(blurEvent.target.name).toBe('test-input');
    expect(blurEvent.target.value).toBe('5');
  });
});
