export enum HttpStatusCode {
  success = 200,
  noContent = 204,
  unauthorized = 401,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: unknown;
};
