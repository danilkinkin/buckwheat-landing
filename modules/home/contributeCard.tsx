import styles from '@/modules/home/contributeCard.module.scss';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import Link from 'next/link';
import { animated, useSpring } from '@react-spring/web';
import { useRef } from 'react';

const locales: LocalesMap = {
  ru: {
    title: 'Вклад',
    description: 'Узнайте, как вы можете помочь проекту',
  },
  en: {
    title: 'Contribute',
    description: 'Find out how you can help the project',
  },
};

export default function ContributeCard() {
  const t = useLocale(locales);
  const cardRef = useRef(null);

  const [springsBackground, apiBackground] = useSpring(() => ({
    scale: 1,
    config: { mass: 4, tension: 350, friction: 30 },
  }));
  const [springsForeground, apiForeground] = useSpring(() => ({
    scale: 1,
    config: { mass: 2, tension: 350, friction: 20 },
  }));

  const handleEnter = () => {
    apiForeground.start({
      scale: 1.5,
    });
    apiBackground.start({
      scale: 1.15,
    });
  };
  const handleLeave = () => {
    apiForeground.start({
      scale: 1,
    });
    apiBackground.start({
      scale: 1,
    });
  };

  return (
    <Link href="/contribute" className={styles.cardWrapper}>
      <Card
        ref={cardRef}
        className={styles.card}
        title={t('title')}
        subtitle={t('description')}
        classes={{ content: styles.cardContent, title: styles.title}}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className={styles.circlesContainer}>
          <animated.div
            className={styles.circlesBackground}
            style={{ ...springsBackground }}
          />
          <animated.div
            className={styles.circlesFroreground}
            style={{ ...springsForeground }}
          />
        </div>
      </Card>
    </Link>
  );
}
