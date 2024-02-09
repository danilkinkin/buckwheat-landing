import Head from 'next/head';
import styles from '@/modules/contribute/contribute.module.scss';
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
import ShareCard from '@/modules/contribute/shareCard';
import { GithubButton } from '@/components/githubButton';

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
        <div className={styles.langSwitcher}>
          <GithubButton />
          <LangSwitcher />
        </div>
        <Link href="/" className={styles.homeLink}>
          <Logo className={styles.logo} variant={LogoType.Full} />
        </Link>
        <p className={styles.description}>
          <b className={styles.bold}>{t('appName')}</b> {t('description')}
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.cardsRow}>
          {router.locale !== 'ru' && <HelpUkraineCard />}
          {router.locale === 'ru' && <DonateToFunsCard />}
          <ShareCard />
        </div>
        <Card
          className={clsx(styles.card, styles.reviewCard)}
          title={t('reviewTitle')}
          subtitle={t('reviewDescription')}
          classes={{ content: styles.reviewCardContent }}
        >
          <GooglePlayButton className={styles.googlePlayButton} />
        </Card>
      </main>
      <Footer />
    </>
  );
}
