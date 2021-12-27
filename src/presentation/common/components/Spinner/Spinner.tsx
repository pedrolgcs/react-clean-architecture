// styles
import styles from './spinner.module.scss';

type SpinnerProps = {
  className?: string;
};

function Spinner({ ...props }: SpinnerProps) {
  return <div className={[styles.container, props.className].join(' ')} />;
}

export { Spinner };
