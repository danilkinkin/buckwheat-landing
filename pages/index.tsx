import { Footer } from '@/components/footer';
import { GithubCardButton } from '@/components/githubCardButton';
import { GooglePlayButton } from '@/components/googlePlayButton';
import { ContributeCard } from '@/modules/home/contributeCard';
import Header from '@/modules/home/header';
import styles from '@/modules/home/home.module.scss';
import { HowItsWorkCard } from '@/modules/home/howItsWorkCard';
import { locales } from '@/modules/home/locales';
import useLocale from '@/utils/useLocale';
import useScroll from '@/utils/useScroll';
import Head from 'next/head';
import { Fragment, useRef } from 'react';

export default function HomePage() {
  const t = useLocale(locales);
  const howItsWorkCardRef = useRef<HTMLDivElement>();

  useScroll((scrollY) => {
    if (howItsWorkCardRef.current) {
      const node = howItsWorkCardRef.current;

      const scrollOffset = -Math.min(scrollY - node.offsetTop + window.innerHeight - 300, 0);

      node.style.transform = `translateY(${Math.expm1(scrollOffset / 60)}px) rotate(${-Math.expm1(scrollOffset / 120)}deg)`;
      node.style.transformOrigin = 'right top';
    }
  });

  return (
    <Fragment>
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
    </Fragment>
  );
}
