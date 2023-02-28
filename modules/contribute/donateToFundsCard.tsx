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
        subtitle="Сейчас с России есть много людей, которые остались наедине с системой и очень нуждаются в помощи. Рассмотрите возможность пожертвовать в разные фонды помощи. Им эта помощь нужна больше чем мне. Вот несколько фондов которые я бы посоветовал"
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
        Если вы решились на пожертвование, заполните, пожалуйста,{' '}
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSearMo38RGIMXN4DOuLRLKRRl4O43gKPB9Mvpc3on6rEYJKow/viewform"
          target="_blank"
        >
          короткую форму
        </Link>
        . Она анонимная, просто хочу понять сколько людей я сподвиг
      </p>
    </div>
  );
}
