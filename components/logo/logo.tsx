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

type LogoProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  orientation?: Orientation;
  variant?: LogoType;
};

export function Logo(props: LogoProps) {
  const {
    orientation = Orientation.Horizontal,
    variant = LogoType.Full,
    className: restClassName,
    ...restProps
  } = props;

  return (
    <div
      className={clsx(
        restClassName,
        styles.logo,
        orientation === Orientation.Vertical && styles.vertical
      )}
      {...restProps}
    >
      {variant !== LogoType.Title && <LogoSVG className={styles.icon} />}
      {variant !== LogoType.Icon && <h1 className={styles.title}>buckwheat</h1>}
    </div>
  );
}
