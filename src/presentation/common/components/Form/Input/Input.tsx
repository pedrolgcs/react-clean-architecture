import React from 'react';
import { IconBaseProps } from 'react-icons';
import classnames from 'classnames/bind';

// styles
import styles from './input.module.scss';

const cx = classnames.bind(styles);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ComponentType<IconBaseProps>;
  value: string;
  error?: string;
};

function Input({ icon: Icon, value, ...props }: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  const handleInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  return (
    <div
      className={cx(styles.container, {
        'container--focused': isFocused,
        'container--filed': isFilled,
      })}
    >
      {Icon && <Icon />}
      <input
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...props}
      />
    </div>
  );
}

export { Input };
