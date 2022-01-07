import { ValidationError } from 'yup';

// protocols
import { Errors } from '@/presentation/protocols';

function getYupValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export { getYupValidationErrors };
