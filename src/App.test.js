import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders home page link --> Is "Welcome to AESS" on the screen?', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to AESS/i);
  expect(linkElement).toBeInTheDocument();
});
