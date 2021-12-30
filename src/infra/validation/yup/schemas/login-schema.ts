import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail valido')
    .required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

export { loginSchema };
