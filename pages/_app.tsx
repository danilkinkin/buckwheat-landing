import { manrope } from '@/styles/fonts';
import '@/styles/globals.css';
import clsx from 'clsx';
import type { AppProps } from 'next/app';
import styles from '@/styles/app.module.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={clsx(styles.main, manrope.className)}>
      <Component {...pageProps} />
    </div>
  );
}
