import { clsx } from 'clsx';
import styles from './logo.module.css';
import LogoSVG from '@/assets/images/logo.svg';

export enum LogoType {
  Full,
  Title,
  Icon,
}
export enum Orientation {
  Horizontal,
  Vertical,
}

type LogoProps = {
  orientation?: Orientation;
  variant?: LogoType;
};

export function Logo(props: LogoProps) {
  const { orientation = Orientation.Horizontal, variant = LogoType.Full } =
    props;

  return (
    <div
      className={clsx(
        styles.logo,
        orientation === Orientation.Vertical && styles.vertical
      )}
    >
      {variant !== LogoType.Title && <LogoSVG className={styles.icon} />}
      {variant !== LogoType.Icon && <h1 className={styles.title}>buckwheat</h1>}
    </div>
  );
}
