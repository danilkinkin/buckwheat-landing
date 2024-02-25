import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './card.module.scss';
import LinkIcon from '@/assets/icons/link.svg';
import { animated, useSpring } from '@react-spring/web';
import { CursorEffect } from '@/components/cursor';

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

  const [springs, api] = useSpring(() => ({
    scale: 1,
    config: { mass: 1, tension: 150, friction: 10 },
  }));

  const handleEnter = () => {
    api.start({
      scale: 1.01,
    });
  };
  const handleLeave = () => {
    api.start({
      scale: 1,
    });
  };

  return (
    <CursorEffect className={clsx(styles.cardLinkWrapper, restClassName)} cursorBorderRadius={16} cursorPadding={6}>
      <animated.div
        className={clsx(styles.cardLink)}
        style={{ ...springs }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <Link href={href} target="_blank">
          <div className={styles.cardLinkContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{hrefTitle}</p>
          </div>
          <LinkIcon className={styles.icon} />
        </Link>
      </animated.div>
    </CursorEffect>
  );
}
