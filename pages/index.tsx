import Head from 'next/head';

import styles from '@/modules/home/home.module.scss';
import { Footer } from '@/components/footer';
import useLocale from '@/utils/useLocale';
import { locales } from '@/modules/home/locales';
import HowItsWorkCard from '@/modules/home/howItsWorkCard';
import Header from '@/modules/home/header';
import ContributeCard from '@/modules/home/contributeCard';
import { GooglePlayButton } from '@/components/googlePlayButton';
import { GithubCardButton } from '@/components/githubCardButton';
import useScroll from '@/utils/useScroll';
import { useRef } from 'react';

export default function HomePage() {
  const t = useLocale(locales);
  const howItsWorkCardRef = useRef(null);

  useScroll((scrollY) => {


    if (howItsWorkCardRef.current) {
      const scrollOffset = -Math.min(scrollY - howItsWorkCardRef.current.offsetTop + window.innerHeight - 300, 0);

      howItsWorkCardRef.current.style.transform = `translateY(${Math.expm1(scrollOffset / 60)}px) rotate(${-Math.expm1(scrollOffset / 120)}deg)`;
      howItsWorkCardRef.current.style.transformOrigin = 'right top';
    }
  });

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <Header />
      <main className={styles.main}>
        <div ref={howItsWorkCardRef}>
          <HowItsWorkCard />
        </div>
        <div className={styles.cardsRow}>
          <div className={styles.storesBlock}>
            <GooglePlayButton className={styles.googlePlayButton} />
            <div>
              <GithubCardButton />
            </div>
          </div>
          <ContributeCard />
        </div>
      </main>
      <Footer />
    </>
  );
}
