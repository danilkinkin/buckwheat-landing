import Image from 'next/image';
import phoneMockupLightImage from '@/assets/images/phone-mockup-light.png';
import screenshotEnImage from '@/assets/images/screenshot-en.png';
import screenshotRuImage from '@/assets/images/screenshot-ru.png';
import styles from './howItsWorkCard.module.css';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { forwardRef } from 'react';

const locales: LocalesMap = {
  ru: {
    title: 'Как это работает?',
    description:
      'Записывая каждую трату, вы отрезвляете разум и даете представление о том, сколько и как вы можете потратить.',
  },
  en: {
    title: 'How its work?',
    description:
      'Writing down each spending sobers the mind and gives you an idea of how much and how you can spend',
  },
};

export const HowItsWorkCard = forwardRef<HTMLDivElement, {}>(
  function HowItsWorkCard(props, ref) {
    const router = useRouter();
    const t = useLocale(locales);

    return (
      <Card
        ref={ref}
        className={styles.card}
        title={t('title')}
        subtitle={t('description')}
        backdropOnText
        classes={{ subtitle: styles.description, title: styles.title }}
      >
        <div className={styles.mockupPhoneContiner}>
          <Image
            className={clsx(styles.mockupPhone)}
            height={1200}
            width={1708}
            placeholder="blur"
            alt=""
            src={phoneMockupLightImage}
          />
          <Image
            className={styles.screenshotMain}
            height={2340}
            width={1080}
            placeholder="blur"
            alt=""
            src={router.locale !== 'ru' ? screenshotEnImage : screenshotRuImage}
          />
        </div>
      </Card>
    );
  }
);
