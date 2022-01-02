// protocols
import { Validation } from '@/presentation/protocols';

// validate
import { YupValidate } from '@/validation/validators/yup/yup-validate';

// schema
import { loginSchema } from '@/validation/validators/yup/schemas/login-schema';

const makeLoginValidation = (): Validation => {
  return new YupValidate(loginSchema);
};

export { makeLoginValidation };
