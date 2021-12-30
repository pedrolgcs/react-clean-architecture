import { render, screen } from '@testing-library/react';

// component
import { Login } from './index';

describe('Login', () => {
  it('renders correctly', () => {
    render(<Login />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('should not render spinner on start', () => {
    render(<Login />);
    expect(screen.getByTestId('spinner-wrap').childElementCount).toBe(0);
  });
});
