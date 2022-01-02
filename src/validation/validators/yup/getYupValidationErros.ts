import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

function getYupValidationErros(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export { getYupValidationErros };
