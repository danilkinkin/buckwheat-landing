import styles from '@/modules/home/home.module.css';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { LangSwitcher } from '@/components/langSwitcher';
import { Logo, LogoType } from '@/components/logo';
import { GithubButton } from '@/components/GithubButton';

const locales: LocalesMap = {
  ru: {
    slogan: 'Приложение, которое поможет вам тратить деньги с умом',
  },
  en: {
    slogan: 'App that helps you spend money wisely',
  },
};

export default function Header() {
  const t = useLocale(locales);

  return (
    <header className={styles.header}>
      <div className={styles.langSwitcher}>
        <GithubButton />
        <LangSwitcher />
      </div>
      <Logo className={styles.logo} variant={LogoType.Full} />
      <h1 className={styles.slogan}>{t('slogan')}</h1>
    </header>
  );
}
