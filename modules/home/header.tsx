import styles from '@/modules/home/home.module.scss';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import clsx from 'clsx';
import { ibmPlexMono, caveat } from '@/styles/fonts';
import ThinStarBig from '@/assets/images/thin-star-big.svg';
import ThickRoundStar5 from '@/assets/images/thick-round-star-5.svg';
import thickRoundStar6Url from '@/assets/images/thick-round-star-6.svg?url';
import buckwheatFlat from '@/assets/images/buckwheat-flat.png';
import Image from 'next/image';
import { Gradients } from '@/components/gradients';
import { useEffect, useRef } from 'react';
import useScroll from '@/utils/useScroll';
import { TopBar } from '@/components/topBar';
import useFrame from '@/utils/useFrame';
import useMediaQuery from '@/utils/useMediaQuery';

const locales: LocalesMap = {
  ru: {
    slogan_line_1: (
      <>
        <span>Небольшое</span>
        <span>приложение,</span>
        <span>которое</span>
        <span>поможет</span>
        <div>
          <span>вам</span>
          <div className={styles.thinStarBig}>
            <ThinStarBig />
          </div>
        </div>
      </>
    ),
    slogan_line_2: (
      <>
        <span className={styles.spendWord}>тратить</span>
        <span>деньги</span>
        <span>с</span>
        <span className={clsx(caveat.className, styles.wiselyWord)}>умом</span>
      </>
    ),
  },
  en: {
    slogan_line_1: (
      <>
        <span>An</span>
        <span>small</span>
        <span>app</span>
        <span>that</span>
        <span>helps</span>
        <div>
          <span>you</span>
          <div className={styles.thinStarBig}>
            <ThinStarBig />
          </div>
        </div>
      </>
    ),
    slogan_line_2: (
      <>
        <span className={styles.spendWord}>spend</span>
        <span>money</span>
        <span className={clsx(caveat.className, styles.wiselyWord)}>
          wisely
        </span>
      </>
    ),
  },
};

export default function Header() {
  const t = useLocale(locales);
  const sloganLine1Ref = useRef<HTMLSpanElement>(null);
  const sloganLine2Ref = useRef<HTMLSpanElement>(null);
  const transitionToBackgoundRef = useRef<HTMLDivElement>(null);
  const thickRoundStar6MaskRef = useRef<HTMLDivElement>(null);
  const thickRoundStar6ImageRef = useRef<HTMLImageElement>(null);
  const thickRoundStar5 = useRef<HTMLDivElement>(null);
  const breakpoint600 = useMediaQuery('(max-width: 600px)');

  useScroll((scrollY, deltaTime, time) => {
    const childs: HTMLSpanElement[] = [
      ...Array.from(sloganLine1Ref.current?.children || []),
      ...Array.from(sloganLine2Ref.current?.children || []),
    ] as HTMLSpanElement[];

    childs.forEach((child, index) => {
      const rawOffset = Math.min(-scrollY * 2 + index * 30, 0);
      const offset = Math.max(-Math.pow(rawOffset / 50, 2), -500);
      const rotateDirection = index % 2 === 0 ? 1 : -1;

      child.style.transform = `translate3D(0px, ${offset}px, 0px) rotate(${(offset / 10) * rotateDirection}deg)`;
    });

    if (transitionToBackgoundRef.current && scrollY + 300 < window.innerHeight) {
      transitionToBackgoundRef.current.style.height = `${scrollY + 300}px`;
    }

    if (thickRoundStar6MaskRef.current && scrollY - 300 < window.innerHeight) {
      thickRoundStar6MaskRef.current.style.transform = `translate3D(0px, ${scrollY / 6}px, 0px) rotate(${scrollY / 8 + (time * 0.01) % 360}deg)`;
    }

    if (thickRoundStar6ImageRef.current && scrollY - 300 < window.innerHeight) {
      thickRoundStar6ImageRef.current.style.transform = `rotate(${-scrollY / 8 - (time * 0.01) % 360}deg) translate3d(0,0,0)`;
    }

    if (thickRoundStar5.current && scrollY - 300 < window.innerHeight) {
      thickRoundStar5.current.style.transform = `translate3D(-50%, -50%,0) rotate(${-scrollY / 6 - 10}deg)`;
    }
  }, { accelerator: 0.06 });

  return (
    <header className={styles.header}>
      <TopBar />
      <div
        className={styles.thickRoundStar6}
        ref={thickRoundStar6MaskRef}
        style={{ maskImage: `url(${thickRoundStar6Url.src})` }}
      >
        <Image
          ref={thickRoundStar6ImageRef}
          height={400}
          width={400}
          placeholder="blur"
          alt=""
          src={buckwheatFlat}
        />
      </div>
      <h1 className={clsx(styles.slogan, ibmPlexMono.className)}>
        <span ref={sloganLine1Ref} className={styles.line1}>
          {t('slogan_line_1')}
        </span>
        <span ref={sloganLine2Ref} className={styles.line2}>
          {t('slogan_line_2')}
        </span>
      </h1>
      <div className={styles.thickRoundStar5}>
        <div ref={thickRoundStar5}>
          <ThickRoundStar5 />
        </div>
      </div>
      <div className={styles.gradientContainer}>
        <div
          ref={transitionToBackgoundRef}
          className={styles.transitionToBackgound}
        />
        {!breakpoint600 && <Gradients />}
      </div>
    </header>
  );
}
