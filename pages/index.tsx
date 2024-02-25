import { Footer } from '@/components/footer';
import { GithubCardButton } from '@/components/githubCardButton';
import { GooglePlayButton } from '@/components/googlePlayButton';
import { ContributeCard } from '@/modules/home/contributeCard';
import Header from '@/modules/home/header';
import styles from '@/modules/home/home.module.scss';
import { HowItsWorkCard } from '@/modules/home/howItsWorkCard';
import { FreeCard } from '@/modules/home/freeCard';
import { WidgetsCard } from '@/modules/home/widgetsCard';
import { HistoryCard } from '@/modules/home/historyCard';
import { AnalyticsCard } from '@/modules/home/analyticsCard';
import { locales } from '@/modules/home/locales';
import useLocale from '@/utils/useLocale';
import Head from 'next/head';
import { Fragment } from 'react';

export default function HomePage() {
  const t = useLocale(locales);

  return (
    <Fragment>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <Header />
      <main className={styles.main}>
        <HowItsWorkCard />
        <div className={styles.cardsRow}>
          <FreeCard />
          <WidgetsCard />
        </div>
        <div className={styles.cardsRow}>
          <HistoryCard />
          <AnalyticsCard />
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
