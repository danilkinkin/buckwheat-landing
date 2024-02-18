import styles from '@/modules/home/home.module.scss';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { LangSwitcher } from '@/components/langSwitcher';
import { Logo, LogoType } from '@/components/logo';
import { GithubLink } from '@/components/githubLink';
import clsx from 'clsx';
import { anonymousPro, ibmPlexMono, caveat } from '@/styles/fonts';
import ThinStarBig from '@/assets/images/thin-star-big.svg';
import ThickRoundStar5 from '@/assets/images/thick-round-star-5.svg';
import thickRoundStar6Url from '@/assets/images/thick-round-star-6.svg?url';
import buckwheatFlat from '@/assets/images/buckwheat-flat.png';
import { GooglePlayLink } from '@/components/googlePlayLink';
import Image from 'next/image';
import Gradients from '../gradients/gradient';
import { useEffect, useRef, useState } from 'react';
import useScroll from '@/utils/useScroll';

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
  const topBarRef = useRef(null);

  useScroll((scrollY) => {
    const childs = [
      ...Array.from(sloganLine1Ref.current.children),
      ...Array.from(sloganLine2Ref.current.children),
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

    if (topBarRef.current) {
      topBarRef.current.style.transform = `translateY(${-Math.expm1(scrollY / 6)}px)`;
    }
  });

  return (
    <header className={styles.header}>
      <div className={styles.topBar} ref={topBarRef}>
        <Logo className={styles.logo} variant={LogoType.Full} />
        <GooglePlayLink className={styles.googlePlayLink} />
        <GithubLink />
        <LangSwitcher />
      </div>
      <div
        className={styles.thickRoundStar6}
        style={{
          maskImage: `url(${thickRoundStar6Url.src})`,
          //transform: `translateY(${scrollY / 2}px)`,
        }}
      >
        <Image
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
        <ThickRoundStar5 />
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
