import styles from './widgetsCard.module.scss';
import clsx from 'clsx';
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
    title: 'Keep track of your budget',
    description:
      'Widgets on the home screen will help you remember to add spending and always see how much you have left to spend',
  },
};

export function WidgetsCard() {
  const t = useLocale(locales);

  return (
    <Card
      className={styles.card}
      title={t('title')}
      subtitle={t('description')}
      backdropOnText
      classes={{ subtitle: styles.description, title: styles.title }}
    >
      <div className={styles.mockupPhoneContiner}>
        {/*<Image
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
        />*/}
      </div>
    </Card>
  );
}
