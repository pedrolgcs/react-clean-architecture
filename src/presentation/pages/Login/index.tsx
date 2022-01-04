import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

// components
import { Input, Spinner } from '@/presentation/common/components';

// useCases
import { Authentication } from '@/domain/useCases';

// protocols
import { Validation } from '@/presentation/protocols';

// styles
import styles from './styles.module.scss';

type Inputs = {
  email: string;
  password: string;
};

type LoginProps = {
  authentication: Authentication;
  validation: Validation;
};

function Login({ authentication, validation }: LoginProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const [erros, setErros] = React.useState({} as { [key: string]: string });
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);
    setErros({});

    const verifyErrors = await validation.validate(data);

    if (verifyErrors) {
      setErros(verifyErrors);
      return;
    }

    try {
      const response = await authentication.auth(data);
      toast.success(`Welcome ${response.accessToken}`);
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>login</h1>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            name="email"
            icon={FiMail}
            {...register('email')}
            error={erros?.email}
            autoComplete="off"
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            {...register('password')}
            icon={FiLock}
            error={erros?.password}
            placeholder="password"
          />
          <button type="submit" className={styles.login__button}>
            Entrar
          </button>
        </form>
        <span className={styles.login__link}>Criar conta</span>
      </div>

      <div className={styles.container__spinner} data-testid="spinner-wrap">
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export { Login };
