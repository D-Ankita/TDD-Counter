import React from 'react';
import Button from './Button';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

const defaultProps = { 
  onClick: jest.fn(),
  text: "Increment" ,
};

test('button renders with correct text', () => {
  const { queryByText, rerender } = render(<Button {...defaultProps} />);
  expect(queryByText("Increment")).toBeTruthy(); 

  // Change props
  rerender(<Button {...defaultProps} text="Decrement" />);
  expect(queryByText("Decrement")).toBeTruthy(); 

});



test('calls correct function on click', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button {...defaultProps} onClick={onClick} />)
  fireEvent.click(getByText(defaultProps.text));
  expect(onClick).toHaveBeenCalled();
});