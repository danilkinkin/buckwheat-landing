import { clsx } from 'clsx';
import styles from './card.module.css';
import { ibmPlexMono } from '@/styles/fonts';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title?: string;
  subtitle?: string;
  backdropOnText?: boolean;
  classes?: { [key: string]: string };
};

export function Card(props: CardProps) {
  const {
    title,
    subtitle,
    backdropOnText,
    children,
    classes = {},
    className: restClassName,
    ...restProps
  } = props;

  return (
    <div className={clsx(styles.card, restClassName)} {...restProps}>
      <div className={clsx(styles.textWrapper)}>
        <h3
          className={clsx(ibmPlexMono.className, styles.title, classes.title)}
        >
          <span className={clsx(backdropOnText && styles.backdropOnText)}>
            {title}
          </span>
        </h3>
        {backdropOnText && (
          <h3
            className={clsx(
              ibmPlexMono.className,
              styles.title,
              classes.title,
              styles.backdropTextHelper
            )}
          >
            <span className={clsx(backdropOnText && styles.backdropOnText)}>
              {title}
            </span>
          </h3>
        )}
      </div>
      <div className={clsx(styles.textWrapper)}>
        <p className={clsx(styles.subtitle, classes.subtitle)}>
          <span className={clsx(backdropOnText && styles.backdropOnText)}>
            {subtitle}
          </span>
        </p>
        {backdropOnText && (
          <p
            className={clsx(
              styles.subtitle,
              classes.subtitle,
              styles.backdropTextHelper
            )}
          >
            <span className={clsx(backdropOnText && styles.backdropOnText)}>
              {subtitle}
            </span>
          </p>
        )}
      </div>
      <div className={clsx(styles.content, classes.content)}>{children}</div>
    </div>
  );
}
