import Head from 'next/head';
import styles from '@/modules/contribute/contribute.module.css';
import { Logo, LogoType } from '@/components/logo';
import { GooglePlayButton } from '@/components/googlePlayButton';
import { Card } from '@/components/card';
import { Footer } from '@/components/footer';
import clsx from 'clsx';
import { LangSwitcher } from '@/components/langSwitcher';
import useLocale from '@/utils/useLocale';
import { useRouter } from 'next/router';
import DonateToFunsCard from '@/modules/contribute/donateToFundsCard';
import HelpUkraineCard from '@/modules/contribute/helpUkraineCard';
import Link from 'next/link';
import { locales } from '@/modules/contribute/locales';

export default function ContributePage() {
  const router = useRouter();
  const t = useLocale(locales);

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <header className={styles.header}>
        <Link href="/" style={{ marginRight: 'auto' }}>
          <Logo className={styles.logo} variant={LogoType.Full} />
        </Link>
        <GooglePlayButton className={styles.googlePlayButton} />
        <div className={styles.langSwitcher}>
          <LangSwitcher />
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>
          <b className={styles.bold}>{t('appName')}</b> {t('description')}
        </p>
        <div className={styles.cardsRow}>
          {router.locale !== 'ru' && <HelpUkraineCard />}
          {router.locale === 'ru' && <DonateToFunsCard />}
          <Card
            className={clsx(styles.card, styles.tellFriendsCard)}
            title={t('tellFriendsTitle')}
            subtitle={t('tellFriendsDescription')}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
