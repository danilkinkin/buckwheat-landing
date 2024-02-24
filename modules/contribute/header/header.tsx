import styles from './header.module.scss';
import { TopBar } from '@/components/topBar';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { clsx } from 'clsx';
import LoveIcon from '@/assets/icons/love.svg';
import OpenSourceIcon from '@/assets/icons/open-source.svg';

export const locales: LocalesMap = {
  ru: {
    appName: 'Гречка',
    description:
      '— это мой хобби-проект, и на данный момент я не планирую на нем зарабатывать. Если вы действительно хотите помочь, то вот несколько вариантов, которые можно рассмотреть. Спасибо',
  },
  en: {
    appName: 'Buckwheat',
    description: (
      <>
        <span className={styles.appName}>Buckwheat</span> is <span className={styles.hobbyProject}>a hobby project</span> and I <span className={styles.notPlanEarnMoney}>do not plan to earn money on it</span>, but if you want to help, here are a few ways how to do it
      </>
    ),
    openSource: 'Open source',
    madeWithLove: 'Made with',
  },
};

type ChipProps = {
  className?: string;
  label: string;
  icon: any;
};

function Chip(props: ChipProps) {
  const { className, label, icon } = props;

  return (
    <div className={clsx(styles.chip, className)}>
      <span>{label}</span>
      <span className={styles.icon}>{icon}</span>
    </div>
  );
}


export function Header() {
  const t = useLocale(locales);
  return (

    <header className={styles.header}>
      <TopBar notHide />
      <div className={styles.content}>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.chipsContainer}>
          <Chip className={styles.openSourceChip} label={t('openSource')} icon={(<OpenSourceIcon />)} />
          <Chip className={styles.madeWithLoveChip} label={t('madeWithLove')} icon={(<LoveIcon />)} />
        </div>
      </div>
    </header>
  );
}
