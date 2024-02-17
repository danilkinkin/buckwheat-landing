import useLocale, { LocalesMap } from '@/utils/useLocale';
import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './footer.module.scss';
import FatLittleStar from '@/assets/images/fat-little-star.svg';
import { useEffect, useRef } from 'react';

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
  const fatLittleStarRef = useRef(null);

  useEffect(() => {
    const scrollHandler = () => {
      const scrollOffset = window.document.scrollingElement.scrollHeight - window.innerHeight - window.scrollY;

      if (fatLittleStarRef.current) {
        fatLittleStarRef.current.style.transform = `translate(30px, ${scrollOffset / -2 + 10}px)`;
      }
    };

    addEventListener('scroll', scrollHandler);

    return () => {
      removeEventListener('scroll', scrollHandler);
    };
  }, []);

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
