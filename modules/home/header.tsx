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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      setScrollY(window.scrollY);
    };

    addEventListener('scroll', scrollHandler);

    return () => {
      removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topBar} style={{ transform: `translateY(${scrollY * -0.5}px)` }}>
        <Logo className={styles.logo} variant={LogoType.Full} />
        <GooglePlayLink className={styles.googlePlayLink} />
        <GithubLink />
        <LangSwitcher />
      </div>
      <div
        className={styles.thickRoundStar6}
        style={{
          maskImage: `url(${thickRoundStar6Url.src})`,
          transform: `translateY(${scrollY / 2}px)`,
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
        style={{ transform: `translateY(${scrollY / 4}px)` }}
        className={clsx(styles.slogan, ibmPlexMono.className)}
      >
        <span className={styles.line1}>{t('slogan_line_1')}</span>
        <span className={styles.line2}>{t('slogan_line_2')}</span>
      </h1>
      <div className={styles.thickRoundStar5}>
        <ThickRoundStar5 />
      </div>
      <div className={styles.gradientContainer}>
        <div
          style={{ height: `${scrollY + 300}px` }}
          className={styles.transitionToBackgound}
        />
        <Gradients />
      </div>
    </header>
  );
}
