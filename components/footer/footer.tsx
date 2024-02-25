import useLocale, { LocalesMap } from '@/utils/useLocale';
import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './footer.module.scss';
import FatLittleStar from '@/assets/images/fat-little-star.svg';
import { useRef } from 'react';
import useScroll from '@/utils/useScroll';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const localesMap: LocalesMap = {
  ru: {
    madeBy: 'сделано',
  },
  en: {
    madeBy: 'made by',
  },
};

export function Footer(props: CardProps) {
  const { className: restClassName, ...restProps } = props;
  const t = useLocale(localesMap);
  const fatLittleStarRef = useRef<HTMLDivElement>(null);

  useScroll((scrollY) => {
    if (
      typeof window === 'undefined' ||
      window.document.scrollingElement === null
    )
      return;

    const scrollOffset =
      window.document.scrollingElement.scrollHeight -
      window.innerHeight -
      scrollY;

    if (fatLittleStarRef.current) {
      fatLittleStarRef.current.style.transform = `translate3D(30px, ${scrollOffset / -2 + 10}px, 0) rotate(${scrollOffset / 10}deg)`;
    }
  });

  return (
    <footer className={clsx(restClassName, styles.footer)} {...restProps}>
      <div ref={fatLittleStarRef} className={styles.fatLittleStar}>
        <FatLittleStar />
      </div>
      <p className={styles.author}>
        {`${t('madeBy')} `}
        <Link
          className={styles.danilkinkin}
          href="https://danilkinkin.com"
          target="_blank"
          prefetch={false}
        >
          @danilkinkin
        </Link>
      </p>
    </footer>
  );
}
