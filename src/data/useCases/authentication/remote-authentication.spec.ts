import * as faker from 'faker';

// mocks
import {
  mockAccountModel,
  mockAuthentication,
} from '@/domain/test/mock-account';
import { HttpPostClientSpy } from '@/data/test';

// erros
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';

// http
import { HttpStatusCode } from '@/data/protocols/http';

// models
import { AccountModel } from '@/domain/models';

// useCase
import { AuthenticationParams } from '@/domain/useCases';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    const URL = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(URL);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(URL);
  });

  it('Should call HttpClient with correct body', async () => {
    const params = mockAuthentication();
    const { sut, httpPostClientSpy } = makeSut();

    await sut.auth(params);

    expect(httpPostClientSpy.body).toEqual(params);
  });

  it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResponse = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResponse,
    };

    const account = await sut.auth(mockAuthentication());

    expect(account).toEqual(httpResponse);
  });
});
