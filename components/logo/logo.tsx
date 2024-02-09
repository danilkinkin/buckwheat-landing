import { clsx } from 'clsx';
import styles from './logo.module.css';
import LogoSVG from '@/assets/images/logo-alt.svg';
import useLocale, { LocalesMap } from '@/utils/useLocale';

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

const localesMap: LocalesMap = {
  ru: {
    title: 'гречка',
  },
  en: {
    title: 'buckwheat',
  },
};

export function Logo(props: LogoProps) {
  const {
    orientation = Orientation.Horizontal,
    variant = LogoType.Full,
    className: restClassName,
    ...restProps
  } = props;
  const t = useLocale(localesMap);

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
      {variant !== LogoType.Icon && (
        <h1 className={styles.title}>{t('title')}</h1>
      )}
    </div>
  );
}
