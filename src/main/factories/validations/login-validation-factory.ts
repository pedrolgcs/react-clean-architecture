// protocols
import { Validation } from '@/validation/protocols/validation';

// validate
import { YupValidate } from '@/validation/infra/yup/yup-validate';

// schema
import { loginSchema } from '@/validation/infra/yup/schemas/login-schema';

const makeLoginValidation = (): Validation => {
  return new YupValidate(loginSchema);
};

export { makeLoginValidation };
