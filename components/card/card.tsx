import { clsx } from 'clsx';
import styles from './card.module.css';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title?: string;
  subtitle?: string;
};

export function Card(props: CardProps) {
  const {
    title,
    subtitle,
    children,
    className: restClassName,
    ...restProps
  } = props;

  return (
    <div className={clsx(styles.card, restClassName)} {...restProps}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
