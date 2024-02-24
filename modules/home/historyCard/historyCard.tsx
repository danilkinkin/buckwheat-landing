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
import screenshotRuImage from '@/assets/images/history-screenshot-ru.png';
import buchwheatImage from '@/assets/images/history-buckwheat.png';
import maskUrl from '@/assets/images/history-star-mask.svg?url';
import useFrame from '@/utils/useFrame';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';



const locales: LocalesMap = {
  ru: {
    title: 'История всегда под рукой',
    description:
      'Расходы можно быстро просмотреть, отредактировать, а также удалить ошибочные',
    price: '500',
    date: '15:32',
    category: 'Продукты',
  },
  en: {
    title: 'History is always at hand',
    description:
      'Spending can be quickly viewed, edited, and also deleted erroneous',
    price: '€14.2',
    date: '15:32',
    category: 'Groceries',
  },
};

function TutorialRow() {
  const t = useLocale(locales);

  return (
    <div className={styles.tutorialRow}>
      <div className={styles.editBackground}><EditIcon /></div>
      <div className={styles.deleteBackground}><DeleteIcon /></div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.price}>{t('price')}</div>
          <div className={styles.date}>{t('date')}</div>
          <div className={styles.category}>{t('category')}</div>
        </div>
        <div className={styles.backdrop} />
      </div>
    </div>
  );
}

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
        <TutorialRow />
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
          src={router.locale === 'ru' ? screenshotRuImage : screenshotEnImage}
        />
      </div>
    </Card>
  );
}
