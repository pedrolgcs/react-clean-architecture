import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

// components
import { Input, Spinner } from '@/presentation/common/components';

// useCases
import { Authentication } from '@/domain/useCases';

// contexts
import { useAuth } from '@/presentation/contexts/authContext';

// protocols
import { Validation } from '@/presentation/protocols';

// styles
import styles from './styles.module.scss';

type LoginProps = {
  authentication: Authentication;
  validation: Validation;
};

function Login({ authentication, validation }: LoginProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [erros, setErros] = React.useState({} as { [key: string]: string });
  const [loading, setLoading] = React.useState(false);
  const { setToken } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErros({});

    const data = {
      email,
      password,
    };

    const verifyErrors = await validation.validate(data);

    if (verifyErrors) {
      setErros(verifyErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await authentication.auth(data);
      setToken(response.accessToken);
      toast.success(`Welcome ${response.accessToken}`);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>login</h1>
        <form
          className={styles.login__form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <Input
            type="email"
            name="email"
            icon={FiMail}
            value={email}
            onChange={event => setEmail(event.target.value)}
            error={erros?.email}
            autoComplete="off"
            placeholder="Email"
            data-testid="email"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            icon={FiLock}
            error={erros?.password}
            placeholder="password"
            data-testid="password"
          />
          <button
            type="submit"
            disabled={loading}
            className={styles.login__button}
            data-testid="submit-button"
          >
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
