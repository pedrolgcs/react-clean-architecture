import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

// components
import { Spinner } from '@/presentation/common/components/Spinner/Spinner';
import { Input } from '@/presentation/common/components/Form/Input/Input';

// styles
import styles from './login.module.scss';

function Login() {
  const [loading] = React.useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>login</h1>
        <form className={styles.login__form}>
          <Input
            type="email"
            name="email"
            icon={FiMail}
            autoComplete="off"
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="password"
          />
          <button type="submit" className={styles.login__button}>
            Entrar
          </button>
        </form>
        <span className={styles.login__link}>Criar conta</span>
      </div>

      {loading && (
        <div className={styles.container__spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export { Login };
