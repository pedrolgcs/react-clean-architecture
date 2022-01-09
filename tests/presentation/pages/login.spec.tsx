/*
import faker from 'faker';

describe('[PAGES] - Login', () => {
  it('true', () => {
    expect(true).toBe(true);
  });
});
*/

import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import faker from 'faker';
import toast from 'react-hot-toast';

// page
import { Login } from '@/presentation/pages/Login';

// contexts
import { AuthProvider } from '@/presentation/contexts/authContext';

// protocols
import { Errors } from '@/presentation/protocols';

// mocks
import { AuthenticationSpy, RemoteUserProfileSpy } from '@/tests/domain/mocks';
import { MockValidate } from '@/tests/validation/mocks/validate';
import { populateField } from '@/tests/presentation/mocks';

jest.mock('react-hot-toast');

type SutParams = {
  validationError: Errors;
};

const makeSut = (params?: SutParams) => {
  const validationMock = new MockValidate(params?.validationError);
  const authenticationSpy = new AuthenticationSpy();
  const userProfileSpy = new RemoteUserProfileSpy();

  render(
    <AuthProvider getUserProfile={userProfileSpy}>
      <Login authentication={authenticationSpy} validation={validationMock} />
    </AuthProvider>,
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
    const toastSpy = jest.spyOn(toast, 'success');

    await simulateValidSubmit();

    expect(toastSpy).toHaveBeenCalledWith(expect.any(String));
  });

  it('Should be show error if Authentication failed', async () => {
    const { authenticationSpy } = makeSut();
    const toastSpy = jest.spyOn(toast, 'error');

    jest
      .spyOn(authenticationSpy, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error('any_error')));

    await simulateValidSubmit();

    expect(toastSpy).toHaveBeenCalledWith('any_error');
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('spinner-wrap').childElementCount).toBe(0);
  });
});
