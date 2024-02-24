import styles from './analyticsCard.module.scss';
import clsx from 'clsx';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import Image from 'next/image';
import backdropImage from '@/assets/images/analytics-backdrop.png';
import screenshotEnImage from '@/assets/images/analytics-screenshot-en.png';
import shadowImage from '@/assets/images/analytics-shadow.png';

const locales: LocalesMap = {
  ru: {
    title: 'Как это работает?',
    description:
      'Записывая каждую трату, вы отрезвляете разум и даете представление о том, сколько и как вы можете потратить.',
  },
  en: {
    title: 'Analyze',
    description:
      'At the end of each period, you will receive analytics to understand how you spent money and what can be changed',
  },
};

export function AnalyticsCard() {
  const t = useLocale(locales);

  return (
    <div className={styles.root}>
      <Image
        className={clsx(styles.screenshotImage)}
        width={465}
        placeholder="blur"
        alt=""
        src={screenshotEnImage}
      />
      <div className={styles.imageCard}>
        <Image
          className={clsx(styles.backdropImage)}
          width={465}
          placeholder="blur"
          alt=""
          src={backdropImage}
        />
      </div>
      <Image
        className={clsx(styles.shadowImage)}
        width={465}
        placeholder="blur"
        alt=""
        src={shadowImage}
      />
      <Card
        className={styles.textCard}
        title={t('title')}
        subtitle={t('description')}
        classes={{ subtitle: styles.textCardDescription, title: styles.textCardTitle }}
      />
    </div>
  );
}
