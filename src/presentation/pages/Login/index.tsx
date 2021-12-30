import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

// components
import { Input, Spinner } from '@/presentation/common/components';

// useCases
import { Authentication } from '@/domain/useCases';

// styles
import styles from './styles.module.scss';

type Data = {
  email: string;
  password: string;
};

type LoginProps = {
  authentication: Authentication;
  validation: (data: Data) => Promise<void>;
};

function Login({ authentication, validation }: LoginProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading] = React.useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await validation({ email, password });

      await authentication.auth({
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>login</h1>
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            icon={FiMail}
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete="off"
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            icon={FiLock}
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
