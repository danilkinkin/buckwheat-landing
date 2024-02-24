import styles from './shareCard.module.scss';
import { Card } from '@/components/card';
import clsx from 'clsx';
import Image from 'next/image';
import heartLightImage from '@/assets/images/heart-light.png';
import useLocale, { LocalesMap } from '@/utils/useLocale';
import { CursorEffect } from '@/components/cursor';

const locales: LocalesMap = {
  ru: {
    appName: 'Гречка',
    slogan: 'Приложение, которое поможет вам тратить деньги с умом',
    title: 'Расскажите друзьям',
    description:
      'Мне очень важно, чтобы мои проекты приносили пользу. Если вы расскажете своим друзьям о своем опыте использования этого приложения и как оно помогло вам, я буду вам очень признателен.',
  },
  en: {
    appName: 'Buckwheat',
    slogan: 'App that helps you spend money wisely',
    title: 'Tell your friends',
    description:
      'It is very important to me that my projects bring benefits. If you tell your friends about your experience using this application and how it helped you, I will be very grateful to you.',
  },
};

export function ShareCard() {
  const t = useLocale(locales);

  const ShareCard = (
    <Card
      className={clsx(styles.card)}
      title={t('title')}
      subtitle={t('description')}
      backdropOnText
      classes={{ subtitle: styles.description }}
      onClick={() => {
        if (navigator.share) {
          navigator
            .share({
              title: t('appName'),
              text: t('slogan'),
              url: 'https://buckwheat.app/',
            })
            .then(() => {
              console.log('Thanks for sharing!');
            })
            .catch(console.error);
        }
      }}
    >
      <div className={styles.heartContiner}>
        <Image
          className={clsx(styles.heartImage)}
          height={800}
          width={851}
          placeholder="blur"
          alt=""
          src={heartLightImage}
        />
      </div>
    </Card>
  );
  if (typeof window !== 'undefined' && navigator.share) {
    return (
      <CursorEffect cursorPadding={8} cursorBorderRadius={36}>
        {ShareCard}
      </CursorEffect>
    );
  } else {
    return ShareCard;
  }
}
