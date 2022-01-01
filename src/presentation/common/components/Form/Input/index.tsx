import React from 'react';
import { IconBaseProps } from 'react-icons';
import classnames from 'classnames/bind';

// styles
import styles from './styles.module.scss';

const cx = classnames.bind(styles);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ComponentType<IconBaseProps>;
  value: string;
  error?: string;
};

const InputBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ icon: Icon, value, error, ...props }, ref) => {
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
    <>
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
          ref={ref}
          {...props}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
};

export const Input = React.forwardRef(InputBase);
