import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import faker from 'faker';
import toast from 'react-hot-toast';

// page
import { Login } from '@/presentation/pages/Login';

// protocols
import { Errors } from '@/presentation/protocols';

// mocks
import { AuthenticationSpy } from '@/tests/domain/mocks';
import { MockValidate } from '@/tests/validation/mocks/validate';
import { populateField } from '@/tests/presentation/mocks';

jest.mock('react-hot-toast');

type SutParams = {
  validationError: Errors;
};

const makeSut = (params?: SutParams) => {
  const validationMock = new MockValidate(params?.validationError);
  const authenticationSpy = new AuthenticationSpy();
  render(
    <Login authentication={authenticationSpy} validation={validationMock} />,
  );

  return {
    validationMock,
    authenticationSpy,
  };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  populateField('email', email);
  populateField('password', password);

  const form = screen.getByTestId('form');
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.click(submitButton);

  await waitFor(() => form);
};

describe('[PAGES] - Login', () => {
  it('Should be render correctly', () => {
    makeSut();

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('Should be show erros on validation failed', async () => {
    const emailError = faker.random.words();
    const passwordError = faker.random.words();
    makeSut({
      validationError: { email: emailError, password: passwordError },
    });

    await simulateValidSubmit();

    expect(screen.getByText(emailError)).toBeInTheDocument();
    expect(screen.getByText(passwordError)).toBeInTheDocument();
  });

  it('Should be render spinner on submit form', async () => {
    makeSut();

    await simulateValidSubmit();

    expect(screen.queryByTestId('spinner-wrap').childElementCount).toBe(1);
  });

  it('Should be submit form with correctly values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it('Should be call Authentication only once at a time', async () => {
    const { authenticationSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should be show success message if Authentication done', async () => {
    makeSut();
    const toastMocked = mocked(toast);

    await simulateValidSubmit();

    expect(toastMocked.success).toHaveBeenCalledWith(expect.any(String));
  });

  it('Should be show error if Authentication failed', async () => {
    const { authenticationSpy } = makeSut();
    const toastMocked = mocked(toast);
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(new Error('any_error')));

    await simulateValidSubmit();

    expect(toastMocked.error).toHaveBeenCalledWith('any_error');
    expect(toastMocked.error).toHaveBeenCalledTimes(1);
  });
});
