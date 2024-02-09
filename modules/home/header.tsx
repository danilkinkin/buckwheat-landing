import styles from '@/modules/home/home.module.scss';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { LangSwitcher } from '@/components/langSwitcher';
import { Logo, LogoType } from '@/components/logo';
import { GithubButton } from '@/components/githubButton';
import clsx from 'clsx';
import { anonymousPro, ibmPlexMono, caveat } from '@/styles/fonts';
import GradientGreen from '@/assets/images/header-gradient-green.svg';
import GradientOrange from '@/assets/images/header-gradient-orange.svg';
import ThinStarBig from '@/assets/images/thin-star-big.svg';
import noise from '@/assets/images/noise.png';
import { GooglePlayLink } from '@/components/googlePlayLink';

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
        <span className={clsx(caveat.className, styles.wiselyWord)}>wisely</span>
      </>
    ),
  },
};

export default function Header() {
  const t = useLocale(locales);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Logo className={styles.logo} variant={LogoType.Full} />
        <GooglePlayLink />
        <GithubButton />
        <LangSwitcher />
      </div>
      <h1 className={clsx(styles.slogan, ibmPlexMono.className)}>
        <span className={styles.line1}>{t('slogan_line_1')}</span>
        <span className={styles.line2}>{t('slogan_line_2')}</span>
      </h1>
      <div className={styles.gradientContainer}>
        <div
          className={styles.noiseOverlay}
          style={{ backgroundImage: `url(${noise.src})` }}
        />
        <GradientGreen className={styles.greenGradient} />
        <GradientOrange className={styles.orangeGradient} />
      </div>
    </header>
  );
}
