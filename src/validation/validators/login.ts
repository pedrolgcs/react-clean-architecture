import * as Yup from 'yup';

import { getValidationErros } from '../errors/getValidationErros';

type Data = {
  email: string;
  password: string;
};

async function validate(data: Data) {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Digite um e-mail valido')
        .required('E-mail obrigatório'),
      password: Yup.string().required('Senha obrigatória'),
    });

    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors = getValidationErros(err);
      throw errors;
    }

    throw err;
  }
}

export { validate };
