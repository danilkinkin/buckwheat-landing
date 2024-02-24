import { useRef } from 'react';
import styles from './widgetsCard.module.scss';
import clsx from 'clsx';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import WidgetSmallEn from '@/assets/images/widget-small-en.svg';
import WidgetBigEn from '@/assets/images/widget-big-en.svg';
import maskUrl from '@/assets/images/widgets-star-mask.svg?url';
import buckwheatImage from '@/assets/images/widgets-backdrop.png';
import Image from 'next/image';
import useFrame from '@/utils/useFrame';
import useScroll from '@/utils/useScroll';

const locales: LocalesMap = {
  ru: {
    title: 'Как это работает?',
    description:
      'Записывая каждую трату, вы отрезвляете разум и даете представление о том, сколько и как вы можете потратить.',
  },
  en: {
    title: 'Keep track of your budget',
    description:
      'Widgets on the home screen will help you remember to add spending and always see how much you have left to spend',
  },
};

function SmallWidgetsLine() {
  const rootRef = useRef(null);

  const widgetWidth = 220;
  const swapWidth = widgetWidth * 1;

  useScroll((scrollY, delta, time) => {

    const offset = -(scrollY / 2) - (time / 20);

    if (rootRef.current) {
      rootRef.current.style.transform = `rotate(4deg) translateX(${offset % swapWidth + widgetWidth}px)`;
    }
  });

  return (
    <div ref={rootRef} className={styles.smallWidgetsLine}>
      <WidgetSmallEn />
      <WidgetSmallEn />
      <WidgetSmallEn />
      <WidgetSmallEn />
      <WidgetSmallEn />
      <WidgetSmallEn />
      <WidgetSmallEn />
    </div>
  );
}

function BigWidgetsLine() {
  const rootRef = useRef(null);

  const widgetWidth = 260 + 9;
  const swapWidth = widgetWidth * 1;

  useScroll((scrollY, delta, time) => {

    const offset = (scrollY / 2) + (time / 20);

    if (rootRef.current) {
      rootRef.current.style.transform = `rotate(356deg) translateX(${offset % swapWidth}px)`;
    }
  });

  return (
    <div ref={rootRef} className={styles.bigWidgetsLine}>
      <WidgetBigEn />
      <WidgetBigEn />
      <WidgetBigEn />
      <WidgetBigEn />
      <WidgetBigEn />
      <WidgetBigEn />
    </div>
  );
}

export function WidgetsCard() {
  const t = useLocale(locales);
  const buchwheatImageMaskRef = useRef(null);
  const buchwheatImageRef = useRef(null);

  useFrame((delta, time) => {
    if (buchwheatImageMaskRef.current && buchwheatImageRef.current) {
      buchwheatImageMaskRef.current.style.transform = `rotate(${-(time * 0.005) % 360}deg)`;
      buchwheatImageRef.current.style.transform = `rotate(${(time * 0.005) % 360}deg)`;
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
        <div
          className={styles.buchwheatImageMask}
          ref={buchwheatImageMaskRef}
          style={{
            maskImage: `url(${maskUrl.src})`,
          }}>
          <div ref={buchwheatImageRef} className={styles.buchwheatImageAnchor}>
            <Image
              className={styles.buchwheatImage}
              height={800}
              width={800}
              placeholder="blur"
              alt=""
              src={buckwheatImage}
            />
          </div>
        </div>
        <SmallWidgetsLine />
        <BigWidgetsLine />
      </div>
    </Card>
  );
}
