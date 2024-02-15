import styles from '@/modules/home/home.module.scss';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { LangSwitcher } from '@/components/langSwitcher';
import { Logo, LogoType } from '@/components/logo';
import { GithubLink } from '@/components/githubLink';
import clsx from 'clsx';
import { anonymousPro, ibmPlexMono, caveat } from '@/styles/fonts';
import gradientGreenUrl from '@/assets/images/header-gradient-green.svg?url';
import GradientOrange from '@/assets/images/header-gradient-orange.svg';
import ThinStarBig from '@/assets/images/thin-star-big.svg';
import ThickRoundStar5 from '@/assets/images/thick-round-star-5.svg';
import thickRoundStar6Url from '@/assets/images/thick-round-star-6.svg?url';
import buckwheatFlat from '@/assets/images/buckwheat-flat.png';
import noise from '@/assets/images/noise.png';
import { GooglePlayLink } from '@/components/googlePlayLink';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const locales: LocalesMap = {
  ru: {
    slogan_line_1: (
      <>
        <span>Небольшое</span>
        <span>приложение,</span>
        <span>которое</span>
        <span>поможет</span>
        <span>
          вам
          <span className={styles.thinStarBig}>
            <ThinStarBig />
          </span>
        </span>
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
        <span>
          you
          <span className={styles.thinStarBig}>
            <ThinStarBig />
          </span>
        </span>
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
  const noiseRef = useRef<HTMLDivElement>(null);
  const [noiseOffset, setNoiseOffset] = useState({ x: 0, y: 0 });

  console.log('thickRoundStar6Url', { thickRoundStar6Url });

  useEffect(() => {
    let active = true;

    const frame = () => {
      //noiseRef.current.style.transform = `translate3D(${Math.floor(Math.random() * 500)}px, ${Math.floor(Math.random() * 500)}px, 0px)`;

      if (active) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);

    return () => {
      active = false;
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Logo className={styles.logo} variant={LogoType.Full} />
        <GooglePlayLink />
        <GithubLink />
        <LangSwitcher />
      </div>
      <div
        className={styles.thickRoundStar6}
        style={{ maskImage: `url(${thickRoundStar6Url.src})` }}
      >
        <Image
          height={400}
          width={400}
          placeholder="blur"
          alt=""
          src={buckwheatFlat}
        />
      </div>
      <h1 className={clsx(styles.slogan, ibmPlexMono.className)}>
        <span className={styles.line1}>{t('slogan_line_1')}</span>
        <span className={styles.line2}>{t('slogan_line_2')}</span>
      </h1>
      <div className={styles.thickRoundStar5}>
        <ThickRoundStar5 />
      </div>
      <div
        ref={noiseRef}
        className={styles.noiseOverlay}
        style={{
          backgroundImage: `url(/api/noise)`,
        }}
      />
      <div className={styles.gradientContainer}>
        <div className={styles.greenGradient}>
          <img src={gradientGreenUrl.src} alt="" />
          <img src={noise.src} alt="" />
          <div/>
        </div>
        <GradientOrange className={styles.orangeGradient} />
      </div>
      <div className={styles.backdrop} />
    </header>
  );
}
