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

export default function HomePage() {
  const t = useLocale(locales);

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <Header />
      <main className={styles.main}>
        <HowItsWorkCard />
        <div className={styles.cardsRow}>
          <div className={styles.storesBlock}>
            <GooglePlayButton className={styles.googlePlayButton} />
            <div>
              <GithubCardButton/>
            </div>
          </div>
          <ContributeCard />
        </div>
      </main>
      <Footer />
    </>
  );
}
