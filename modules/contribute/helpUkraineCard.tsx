import styles from '@/modules/contribute/ukraine.module.css';
import { Card, CardLink } from '@/components/card';
import clsx from 'clsx';

export default function HelpUkraineCard() {
  return (
    <Card
      className={styles.card}
      title="Support Ukraine"
      subtitle="Now people of Ukraine really need help. Help Ukraine through funds"
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
    </Card>
  );
}
