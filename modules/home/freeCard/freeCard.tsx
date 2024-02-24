import styles from './freeCard.module.scss';
import clsx from 'clsx';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import Image from 'next/image';
import backdropImage from '@/assets/images/free-backdrop.png';
import screenshotEnImage from '@/assets/images/free-screenshot-en.png';
import screenshotRuImage from '@/assets/images/free-screenshot-ru.png';
import shadowImage from '@/assets/images/free-shadow.png';
import ExclamationPoint from '@/assets/images/free-exclamation-point.svg';
import Outline from '@/assets/images/free-outline.svg';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

const locales: LocalesMap = {
  ru: {
    freeForever: 'Бесплатно навсегда',
    wihthoutAds: 'Без рекламы',
  },
  en: {
    freeForever: 'Free forever',
    wihthoutAds: 'Without ads',
  },
};

export function FreeCard() {
  const router = useRouter();
  const t = useLocale(locales);

  return (
    <div className={styles.root}>
      <Image
        className={clsx(styles.screenshotImage)}
        width={695}
        placeholder="blur"
        alt=""
        src={router.locale === 'ru' ? screenshotRuImage : screenshotEnImage}
      />
      <div className={styles.imageCard}>
        <Image
          className={clsx(styles.backdropImage)}
          width={695}
          placeholder="blur"
          alt=""
          src={backdropImage}
        />
      </div>
      <Image
        className={clsx(styles.shadowImage)}
        width={695}
        placeholder="blur"
        alt=""
        src={shadowImage}
      />
      <Card
        className={styles.freeForever}
        title={(
          <Fragment>
            {t('freeForever')}
            <span className={styles.freeForeverTitleExclamationPoint}><ExclamationPoint /></span>
          </Fragment>
        )}
        classes={{ title: styles.freeForeverTitle }}
      />
      <Card
        className={styles.wihthoutAds}
        title={(
          <Fragment>
            {t('wihthoutAds')}
            <span className={styles.wihthoutAdsTitleOutline}><Outline /></span>
          </Fragment>
        )}
        classes={{ title: styles.wihthoutAdsTitle }}
      />
    </div>
  );
}
