import { render, RenderResult } from '@testing-library/react';

// component
import { Login } from './index';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);
  return {
    sut,
  };
};

describe('Login', () => {
  it('renders correctly', () => {
    const { sut } = makeSut();
    expect(sut.getByText(/login/i)).toBeInTheDocument();
  });

  it('should not render spinner on start', () => {
    const { sut } = makeSut();
    expect(sut.getByTestId('spinner-wrap').childElementCount).toBe(0);
  });
});
