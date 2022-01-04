// styles
import styles from './styles.module.scss';

type SpinnerProps = {
  className?: string;
};

function Spinner({ ...props }: SpinnerProps) {
  return (
    <div
      className={[styles.container, props.className].join(' ')}
      data-testid="spinner"
    />
  );
}

export { Spinner };
