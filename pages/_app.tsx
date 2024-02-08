import { manrope } from '@/styles/fonts';
import '@/styles/globals.css';
import clsx from 'clsx';
import type { AppProps } from 'next/app';
import styles from '@/styles/app.module.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={clsx(styles.main, manrope.className)}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
