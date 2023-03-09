import styles from '@/modules/contribute/helpUkraineCard.module.scss';
import { Card, CardLink } from '@/components/card';
import clsx from 'clsx';
import UkraineMapSvg from '@/assets/images/ukraine-map.svg';
import Link from 'next/link';
import InfoIcon from '@/assets/icons/info.svg';

export default function HelpUkraineCard() {
  return (
    <div className={styles.cardContainer}>
      <Card
        className={styles.card}
        title="Support Ukraine"
        subtitle="For over a year, a peaceful nation has been under threat of destruction by the Russian authorities. They are fighting to hold on, but it's not easy. Please help Ukraine defend their freedom."
      >
        <CardLink
          className={clsx(styles.link, styles.topOffset)}
          title="Official website of Ukraine"
          hrefTitle="war.ukraine.ua"
          href="https://war.ukraine.ua/"
        />
        <CardLink
          className={styles.link}
          title="Community of Ukrainian and international activists"
          hrefTitle="supportukrainenow.org"
          href="https://supportukrainenow.org/"
        />
        <UkraineMapSvg className={styles.ukraineMap} />
      </Card>
      <p className={styles.captionLink}>
        <InfoIcon />
        If you have decided to donate, please fill out{' '}
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSejBz_dbR15jJ33bAwxt-gKimhnX1VzqpDZJLADYubBR7bVbg/viewform"
          target="_blank"
        >
          a short anonymous form
        </Link>
        . This will help me understand how many people were inspired to help.
      </p>
    </div>
  );
}
