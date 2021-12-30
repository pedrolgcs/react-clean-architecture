import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

// components
import { Input, Spinner } from '@/presentation/common/components';

// useCases
import { Authentication } from '@/domain/useCases';

// protocols
import { Validation } from '@/validation/protocols/validation';

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
  const [loading] = React.useState(false);

  console.log(erros);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setErros({});

    const verifyErrors = await validation.validate({ email, password });

    if (verifyErrors) {
      setErros(verifyErrors);
      return;
    }

    try {
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
            error={erros?.email}
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
