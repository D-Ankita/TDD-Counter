import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Counter', () => {
  render(<App />);
  const component = screen.getByText(/Counter/i);
  expect(component).toBeInTheDocument();
});
