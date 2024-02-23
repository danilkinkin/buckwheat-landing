import { useRef } from 'react';
import styles from './historyCard.module.scss';
import clsx from 'clsx';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { useRouter } from 'next/router';
import Image from 'next/image';
import backdropImage from '@/assets/images/history-backdrop.png';
import screenshotEnImage from '@/assets/images/history-screenshot-en.png';
import buchwheatImage from '@/assets/images/history-buckwheat.png';
import maskUrl from '@/assets/images/history-star-mask.svg?url';
import useFrame from '@/utils/useFrame';



const locales: LocalesMap = {
  ru: {
    title: 'Как это работает?',
    description:
      'Записывая каждую трату, вы отрезвляете разум и даете представление о том, сколько и как вы можете потратить.',
  },
  en: {
    title: 'History is always at hand',
    description:
      'Spending can be quickly viewed, edited, and also deleted erroneous',
  },
};

export function HistoryCard() {
  const router = useRouter();
  const t = useLocale(locales);
  const buchwheatImageMaskRef = useRef(null);
  const buchwheatImageRef = useRef(null);

  useFrame((delta, time) => {
    if (buchwheatImageMaskRef.current && buchwheatImageRef.current) {
      buchwheatImageMaskRef.current.style.transform = `rotate(${(time * 0.01) % 360}deg)`;
      buchwheatImageRef.current.style.transform = `rotate(${-(time * 0.01) % 360}deg)`;
    }
  });

  return (
    <Card
      className={styles.card}
      title={t('title')}
      subtitle={t('description')}
      backdropOnText
      classes={{ subtitle: styles.description, title: styles.title }}
    >
      <div className={styles.mockupPhoneContiner}>
        <Image
          className={clsx(styles.backdropImage)}
          height={650}
          placeholder="blur"
          alt=""
          src={backdropImage}
        />
        <div
          className={styles.buchwheatImageMask}
          ref={buchwheatImageMaskRef}
          style={{
            maskImage: `url(${maskUrl.src})`,
            //transform: `translateY(${scrollY / 2}px)`,
          }}>
          <div ref={buchwheatImageRef} className={styles.buchwheatImageAnchor}>
            <Image
              className={styles.buchwheatImage}
              height={650}
              placeholder="blur"
              alt=""
              src={buchwheatImage}
            />
          </div>
        </div>
        <Image
          className={styles.screenshot}
          height={650}
          placeholder="blur"
          alt=""
          src={router.locale !== 'ru' ? screenshotEnImage : screenshotEnImage}
        />
      </div>
    </Card>
  );
}
