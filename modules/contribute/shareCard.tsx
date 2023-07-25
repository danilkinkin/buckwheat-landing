import styles from './shareCard.module.scss';
import { Card } from '@/components/card';
import clsx from 'clsx';
import Image from 'next/image';
import heartLightImage from '@/assets/images/heart-light.png';
import heartDarkImage from '@/assets/images/heart-dark.png';
import useLocale, { LocalesMap } from '@/utils/useLocale';

const locales: LocalesMap = {
  ru: {
    title: 'Расскажите друзьям о приложении',
    description:
      'Мне очень важно, чтобы мои проекты приносили пользу. Если вы расскажете своим друзьям о своем опыте использования этого приложения и как оно помогло вам, я буду вам очень признателен.',
  },
  en: {
    title: 'Tell your friends about the application',
    description:
      'It is very important to me that my projects bring benefits. If you tell your friends about your experience using this application and how it helped you, I will be very grateful to you.',
  },
};

export default function ShareCard() {
  const t = useLocale(locales);

  return (
    <Card
      className={clsx(styles.card)}
      title={t('title')}
      subtitle={t('description')}
      backdropOnText
      classes={{ subtitle: styles.description }}
    >
      <div className={styles.heartContiner}>
        <Image
          className={clsx(styles.heartImage, '--light-image')}
          height={800}
          width={851}
          placeholder="blur"
          alt=""
          src={heartLightImage}
        />
        <Image
          className={clsx(styles.heartImage, '--dark-image')}
          height={800}
          width={851}
          placeholder="blur"
          alt=""
          src={heartDarkImage}
        />
      </div>
    </Card>
  );
}
