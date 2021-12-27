import React from 'react';

// components
import { Spinner } from '../../common/components/Spinner/Spinner';

// styles
import styles from './login.module.scss';

function Login() {
  const [loading] = React.useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>login</h1>
        <form className={styles.login__form}>
          <input
            type="email"
            name="email"
            className={styles.login__input}
            autoComplete="off"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className={styles.login__input}
            autoComplete="off"
            placeholder="*****"
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
