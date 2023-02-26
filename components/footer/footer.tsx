import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './footer.module.css';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Footer(props: CardProps) {
  const { className: restClassName, ...restProps } = props;

  return (
    <footer className={clsx(restClassName, styles.footer)} {...restProps}>
      <p className={styles.author}>
        made by{' '}
        <Link
          className={styles.danilkinkin}
          href="https://danilkinkin.com"
          target="_blank"
        >
          @danilkinkin
        </Link>
      </p>
    </footer>
  );
}
