// protocols
import { Validation } from '@/validation/protocols/validation';

// validate
import { YupValidate } from '@/infra/validation/yup/yup-validate';

// schema
import { loginSchema } from '@/infra/validation/yup/schemas/login-schema';

const makeLoginValidation = (): Validation => {
  return new YupValidate(loginSchema);
};

export { makeLoginValidation };
