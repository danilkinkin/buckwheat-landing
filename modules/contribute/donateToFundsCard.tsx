import styles from '@/modules/contribute/donateToFundsCard.module.scss';
import { Card, CardLink } from '@/components/card';
import clsx from 'clsx';
import Link from 'next/link';
import InfoIcon from '@/assets/icons/info.svg';

export default function DonateToFunsCard() {
  return (
    <div className={styles.cardContainer}>
      <Card
        className={styles.card}
        title="Пожертвуйте в фонды"
        subtitle="Сейчас в России много людей, которые остались наедине с системой и очень нуждаются в помощи. Рассмотрите возможность сделать пожертвование в различные фонды помощи — они нуждаются в этой помощи больше, чем я. Вот несколько фондов, которые я могу порекомендовать:"
      >
        <CardLink
          className={clsx(styles.link, styles.topOffset)}
          title="Независимый правозащитный проект"
          hrefTitle="ovdinfo.org"
          href="https://ovdinfo.org/"
        />
        <CardLink
          className={styles.link}
          title="Фонд помощи социально-незащищённым гражданам"
          hrefTitle="nuzhnapomosh.ru"
          href="https://nuzhnapomosh.ru/"
        />
      </Card>
      <p className={styles.captionLink}>
        <InfoIcon />
        Если вы решили пожертвовать, пожалуйста, заполните{' '}
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSearMo38RGIMXN4DOuLRLKRRl4O43gKPB9Mvpc3on6rEYJKow/viewform"
          target="_blank"
        >
          короткую анонимную форму
        </Link>
        . Это поможет мне понять, сколько людей было вдохновлено на помощь.
      </p>
    </div>
  );
}
