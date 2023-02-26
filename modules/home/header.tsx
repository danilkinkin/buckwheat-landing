import styles from '@/modules/home/home.module.css';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { LangSwitcher } from '@/components/langSwitcher';
import { Logo, LogoType } from '@/components/logo';
import { GooglePlayButton } from '@/components/googlePlayButton';

const locales: LocalesMap = {
  ru: {
    slogan: 'Приложение, которое поможет вам тратить деньги с умом',
    description:
      'Записывая каждую трату, вы отрезвляете разум и даете представление о том, сколько и как вы можете потратить.',
  },
  en: {
    slogan: 'App that helps you spend money wisely',
    description:
      'Writing down each spending sobers the mind and gives you an idea of how much and how you can spend.',
  },
};

export default function Header() {
  const t = useLocale(locales);

  return (
    <header className={styles.header}>
      <div className={styles.langSwitcher}>
        <LangSwitcher />
      </div>
      <Logo className={styles.logo} variant={LogoType.Full} />
      <h1>{t('slogan')}</h1>
      <p>{t('description')}</p>
      <GooglePlayButton className={styles.googlePlayButton} />
    </header>
  );
}
