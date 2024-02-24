import Head from 'next/head';
import styles from '@/modules/contribute/contribute.module.scss';
import { GooglePlayButton } from '@/components/googlePlayButton';
import { GithubCardButton } from '@/components/githubCardButton';
import { Card } from '@/components/card';
import { Footer } from '@/components/footer';
import clsx from 'clsx';
import useLocale from '@/utils/useLocale';
import { useRouter } from 'next/router';
import { DonateToFunsCard } from '@/modules/contribute/donateToFundsCard';
import { HelpUkraineCard } from '@/modules/contribute/helpUkraineCard';
import { locales } from '@/modules/contribute/locales';
import { ShareCard } from '@/modules/contribute/shareCard';
import { Fragment } from 'react';
import { Header } from '@/modules/contribute/header';

export default function ContributePage() {
  const router = useRouter();
  const t = useLocale(locales);

  return (
    <Fragment>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.cardsRow}>
          {router.locale !== 'ru' && <HelpUkraineCard />}
          {router.locale === 'ru' && <DonateToFunsCard />}
          <ShareCard />
        </div>
        <div className={styles.stores}>
          <Card
            className={clsx(styles.card, styles.reviewCard)}
            title={t('reviewTitle')}
            subtitle={t('reviewDescription')}
            classes={{ content: styles.reviewCardContent }}
          >
            <GooglePlayButton className={styles.googlePlayButton} />
          </Card>
          <div className={styles.additionalStores}>
            <GithubCardButton />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
