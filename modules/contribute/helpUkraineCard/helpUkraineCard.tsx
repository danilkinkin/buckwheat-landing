import styles from './helpUkraineCard.module.scss';
import { Card, CardLink } from '@/components/card';
import clsx from 'clsx';
import Link from 'next/link';
import InfoIcon from '@/assets/icons/info.svg';
import noWarImage from '@/assets/images/no-war.png';
import Image from 'next/image';
import LinkIcon from '@/assets/icons/link.svg';
import { CursorEffect } from '@/components/cursor';

export function HelpUkraineCard() {
  return (
    <div className={styles.cardContainer}>
      <Card
        className={styles.card}
        classes={{ content: styles.cardActionsContent, textWrapper: styles.cardTextWrapper }}
        backdropOnText
        title="Support Ukraine"
        subtitle="For over two years, a peaceful nation has been under threat of destruction by the Russian authorities. They are fighting to hold on, but it's not easy. Please help Ukraine defend their freedom"
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

        <Image
          src={noWarImage}
          alt="No war"
          className={styles.noWarImage}
          width={340}
          height={340}
        />
      </Card>
      <p className={styles.captionLink}>
        <InfoIcon />
        If you have decided to donate, please fill out{' '}
        <CursorEffect cursorPadding={6} cursorBorderRadius={6} effectForce={4} effectDistance={24} className={styles.linkCursorEffect}>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSejBz_dbR15jJ33bAwxt-gKimhnX1VzqpDZJLADYubBR7bVbg/viewform"
            target="_blank"
          >
            a short anonymous form
            <LinkIcon />
          </Link>
        </CursorEffect>
        . This will help me understand how many people were inspired to help.
      </p>
    </div>
  );
}
