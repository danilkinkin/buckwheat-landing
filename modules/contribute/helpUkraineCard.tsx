import styles from '@/modules/contribute/ukraine.module.css';
import { Card, CardLink } from '@/components/card';
import clsx from 'clsx';
import UkraineMapSvg from '@/assets/images/ukraine-map.svg';
import Image from 'next/image';

export default function HelpUkraineCard() {
  return (
    <Card
      className={styles.card}
      title="Support Ukraine"
      subtitle="For more than a year, the Russian authorities have been destroying a peaceful state. These people need help to defend their freedom."
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
  );
}
