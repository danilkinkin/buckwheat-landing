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
import { useRef } from 'react';
import useScroll from '@/utils/useScroll';
import { TopBar } from '@/components/topBar';

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
  const sloganLine1Ref = useRef(null);
  const sloganLine2Ref = useRef(null);
  const transitionToBackgoundRef = useRef(null);
  const thickRoundStar6MaskRef = useRef(null);
  const thickRoundStar6ImageRef = useRef(null);
  const thickRoundStar5 = useRef(null);

  useScroll((scrollY, deltaTime, time) => {
    const childs = [
      ...Array.from(sloganLine1Ref.current?.children || []),
      ...Array.from(sloganLine2Ref.current?.children || []),
    ];

    childs.forEach((child, index) => {
      const rawOffset = Math.min(-scrollY + index * 30, 0);

      const offset = -Math.pow(rawOffset / 30, 2); //-Math.expm1(-rawOffset / 80);

      const rotateDirection = index % 2 === 0 ? 1 : -1;

      child.style.transform = `translateY(${offset}px) rotate(${(offset / 10) * rotateDirection}deg)`;
    });

    if (transitionToBackgoundRef.current) {
      transitionToBackgoundRef.current.style.height = `${scrollY + 300}px`;
    }

    if (thickRoundStar6MaskRef.current) {
      thickRoundStar6MaskRef.current.style.transform = `translateY(${scrollY / 6}px) rotate(${scrollY / 8 + (time * 0.01) % 360}deg)`;
    }

    if (thickRoundStar6ImageRef.current) {
      thickRoundStar6ImageRef.current.style.transform = `rotate(${-scrollY / 8 - (time * 0.01) % 360}deg)`;
    }

    if (thickRoundStar5.current) {
      thickRoundStar5.current.style.transform = `translate(-50%, -50%) rotate(${-scrollY / 6 - 10}deg)`;
    }
  });

  return (
    <header className={styles.header}>
      <TopBar />
      <div
        className={styles.thickRoundStar6}
        ref={thickRoundStar6MaskRef}
        style={{
          maskImage: `url(${thickRoundStar6Url.src})`,
          //transform: `translateY(${scrollY / 2}px)`,
        }}
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
      <h1
        //style={{ transform: `translateY(${scrollY / 4}px)` }}
        className={clsx(styles.slogan, ibmPlexMono.className)}
      >
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
        {/* <Gradients /> */}
      </div>
    </header>
  );
}
