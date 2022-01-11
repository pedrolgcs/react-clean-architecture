// validate
import { YupValidate } from '../yup-validate';

// schema
import { loginSchema } from './schemas/login-schema';

const loginValidation = () => {
  return new YupValidate(loginSchema);
};

export { loginValidation };
