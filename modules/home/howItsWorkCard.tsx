import Image from 'next/image';
import phoneMockupImage from '@/assets/images/phone-mockup-1.png';
import screenshotMainImage from '@/assets/images/screenshot-main.png';
import styles from '@/modules/home/howItsWorkCard.module.css';
import { Card } from '@/components/card';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';

const locales: LocalesMap = {
  ru: {
    title: 'Как это работает?',
    description:
      'Записывая каждую трату, вы отрезвляете разум и даете представление о том, сколько и как вы можете потратить.',
  },
  en: {
    title: 'How does it work?',
    description:
      'Writing down each spending sobers the mind and gives you an idea of how much and how you can spend',
  },
};

export default function HowItsWorkCard() {
  const t = useLocale(locales);

  return (
    <Card
      className={styles.card}
      title={t('title')}
      subtitle={t('description')}
      classes={{ subtitle: styles.description }}
    >
      <div className={styles.mockupPhoneContiner}>
        <Image
          className={styles.screenshotMain}
          height={2340}
          width={1080}
          placeholder="blur"
          alt=""
          src={screenshotMainImage}
        />
        <Image
          className={styles.mockupPhone}
          height={900}
          width={1050}
          placeholder="blur"
          alt=""
          src={phoneMockupImage}
        />
      </div>
    </Card>
  );
}
