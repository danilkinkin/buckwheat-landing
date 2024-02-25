import { useRef } from 'react';
import styles from './widgetsCard.module.scss';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import WidgetSmallEn from '@/assets/images/widget-small-en.svg';
import WidgetBigEn from '@/assets/images/widget-big-en.svg';
import WidgetSmallRu from '@/assets/images/widget-small-ru.svg';
import WidgetBigRu from '@/assets/images/widget-big-ru.svg';
import maskUrl from '@/assets/images/widgets-star-mask.svg?url';
import buckwheatImage from '@/assets/images/widgets-backdrop.png';
import Image from 'next/image';
import useFrame from '@/utils/useFrame';
import useScroll from '@/utils/useScroll';
import { useRouter } from 'next/router';
import useMediaQuery from '@/utils/useMediaQuery';

const locales: LocalesMap = {
  ru: {
    title: 'Следите за своим бюджетом',
    description:
      'Виджеты на главном экране помогут вам не забывать добавлять расходы и всегда видеть, сколько вам осталось потратить',
  },
  en: {
    title: 'Keep track of your budget',
    description:
      'Widgets on the home screen will help you remember to add spending and always see how much you have left to spend',
  },
};

function SmallWidgetsLine() {
  const router = useRouter();
  const rootRef = useRef(null);
  const breakpoint800 = useMediaQuery('(max-width: 800px)');

  const widgetWidth = breakpoint800 ? 170 : 220;
  const swapWidth = widgetWidth * 1;

  useScroll((scrollY, delta, time) => {

    const offset = -(scrollY / 2) - (time / 20);

    if (rootRef.current) {
      rootRef.current.style.transform = `rotate(4deg) translateX(${offset % swapWidth + widgetWidth}px)`;
    }
  }, [widgetWidth]);

  const Widget = router.locale === 'ru' ? WidgetSmallRu : WidgetSmallEn;

  return (
    <div ref={rootRef} className={styles.smallWidgetsLine}>
      <Widget />
      <Widget />
      <Widget />
      <Widget />
      <Widget />
      <Widget />
      <Widget />
    </div>
  );
}

function BigWidgetsLine() {
  const router = useRouter();
  const rootRef = useRef(null);
  const breakpoint800 = useMediaQuery('(max-width: 800px)');

  const widgetWidth = (breakpoint800 ? 200 : 260) + 9;
  const swapWidth = widgetWidth * 1;

  useScroll((scrollY, delta, time) => {

    const offset = (scrollY / 2) + (time / 20);

    if (rootRef.current) {
      rootRef.current.style.transform = `rotate(356deg) translateX(${offset % swapWidth}px)`;
    }
  }, [widgetWidth]);

  const Widget = router.locale === 'ru' ? WidgetBigRu : WidgetBigEn;

  return (
    <div ref={rootRef} className={styles.bigWidgetsLine}>
      <Widget />
      <Widget />
      <Widget />
      <Widget />
      <Widget />
      <Widget />
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
