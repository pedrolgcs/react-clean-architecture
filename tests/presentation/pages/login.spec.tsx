import { screen, render } from '@testing-library/react';

import { Login } from '@/presentation/pages/Login';

// mocks
import { AuthenticationSpy } from '@/tests/domain/mocks';
import { MockValidate } from '@/tests/validation/mocks/validate';

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams) => {
  const validationMock = new MockValidate(params);
  const authenticationSpy = new AuthenticationSpy();
  render(
    <Login authentication={authenticationSpy} validation={validationMock} />,
  );

  return {
    validationMock,
    authenticationSpy,
  };
};

describe('[PAGES] - Login', () => {
  it('Should be render correctly', () => {
    makeSut();

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
