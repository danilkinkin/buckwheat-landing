import useLocale, { Locales } from '@/utils/useLocale';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { useRouter } from 'next/router';
import { LocalesMap } from '@/utils/useLocale';

export const locales: LocalesMap = {
  ru: {
    title: 'гречка - менаджер бюджета',
    description: 'Приложение, которое поможет вам тратить деньги с умом',
  },
  en: {
    title: 'buckwheat - budget manager',
    description: 'App that helps you spend money wisely',
  },
};

export default function Document(props: DocumentProps) {
  const locale = props.locale || 'en';

  const t = (key: string) => locales[locale as Locales][key] || key;

  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/ico" href="/favicon.svg" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#FA5A00"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* Primary Meta Tags */}
        <meta name="title" content="buckwheat - budget manager" />
        <meta
          name="description"
          content="App that helps you spend money wisely"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buckwheat.app/" />
        <meta property="og:title" content={t('title')} />
        <meta property="og:description" content={t('description')} />
        <meta
          property="og:image"
          content={`https://buckwheat.app/images/share-banner-${locale}.png`}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://buckwheat.app/" />
        <meta property="twitter:title" content={t('title')} />
        <meta property="twitter:description" content={t('description')} />
        <meta
          property="twitter:image"
          content={`https://buckwheat.app/images/share-banner-${locale}.png`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
