import Head from 'next/head';

import styles from '@/modules/home/home.module.css';
import { Footer } from '@/components/footer';
import useLocale from '@/utils/useLocale';
import { locales } from '@/modules/home/locales';
import HowItsWorkCard from '@/modules/home/howItsWorkCard';
import Header from '@/modules/home/header';
import ContributeCard from '@/modules/home/contributeCard';

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
        <ContributeCard />
      </main>
      <Footer />
    </>
  );
}
