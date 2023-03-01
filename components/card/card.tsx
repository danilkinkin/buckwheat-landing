import { clsx } from 'clsx';
import styles from './card.module.css';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title?: string;
  subtitle?: string;
  classes?: { [key: string]: string };
};

export function Card(props: CardProps) {
  const {
    title,
    subtitle,
    children,
    classes = {},
    className: restClassName,
    ...restProps
  } = props;

  return (
    <div className={clsx(styles.card, restClassName)} {...restProps}>
      <h3 className={styles.title}>{title}</h3>
      <p className={clsx(styles.subtitle, classes.subtitle)}>{subtitle}</p>
      <div className={clsx(styles.content, classes.content)}>{children}</div>
    </div>
  );
}
