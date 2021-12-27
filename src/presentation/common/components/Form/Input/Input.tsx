import React from 'react';
import { IconBaseProps } from 'react-icons';

// styles
import styles from './input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  error?: string;
};

function Input({ name, icon: Icon, ...props }: InputProps) {
  return (
    <div className={styles.container}>
      {Icon && <Icon />}
      <input type="text" name={name} {...props} />
    </div>
  );
}

export { Input };
