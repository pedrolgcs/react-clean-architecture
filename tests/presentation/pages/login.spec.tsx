import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import faker from 'faker';

// page
import { Login } from '@/presentation/pages/Login';

// protocols
import { Errors } from '@/presentation/protocols';

// mocks
import { AuthenticationSpy } from '@/tests/domain/mocks';
import { MockValidate } from '@/tests/validation/mocks/validate';
import { populateField } from '@/tests/presentation/mocks';

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
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(email, password);
    await simulateValidSubmit(email, password);

    expect(authenticationSpy.callsCount).toBe(1);
  });
});
