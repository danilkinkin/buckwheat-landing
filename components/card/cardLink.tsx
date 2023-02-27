import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './card.module.css';
import LinkIcon from '@/assets/icons/link.svg';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title?: string;
  hrefTitle?: string;
  href: string;
};

export function CardLink(props: CardProps) {
  const {
    title,
    hrefTitle,
    href,
    className: restClassName,
    ...restProps
  } = props;

  return (
    <Link
      href={href}
      target="_blank"
      className={clsx(styles.cardLink, restClassName)}
    >
      <div className={styles.cardLinkContent} {...restProps}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{hrefTitle}</p>
      </div>
        <LinkIcon className={styles.icon} />
    </Link>
  );
}
