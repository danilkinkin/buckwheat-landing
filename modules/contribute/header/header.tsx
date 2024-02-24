import styles from './header.module.scss';
import { TopBar } from '@/components/topBar';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { clsx } from 'clsx';
import LoveIcon from '@/assets/icons/love.svg';
import OpenSourceIcon from '@/assets/icons/open-source.svg';
import { Gradients } from '@/components/gradients';
import ContributeArrow from '@/assets/images/contribute-arrow.svg';

export const locales: LocalesMap = {
  ru: {
    appName: 'Гречка',
    description: (
      <>
        <span className={styles.appName}>Гречка</span> — это <span className={styles.hobbyProject}>хобби-проект</span>{' '}
        и я <span className={styles.notPlanEarnMoney}><span>не планирую на нём зарабатывать</span></span>,{' '}
        если вы хотите помочь, вот несколько способов, как это сделать<span className={styles.contributeArrow}><ContributeArrow /></span>
      </>
    ),
    openSource: 'Open source',
    madeWithLove: 'Сделано с',
  },
  en: {
    appName: 'Buckwheat',
    description: (
      <>
        <span className={styles.appName}>Buckwheat</span> is <span className={styles.hobbyProject}>a hobby project</span>{' '}
        and I <span className={styles.notPlanEarnMoney}><span>do not plan to earn money on it</span></span>,{' '}
        if you want to help, here are a few ways how to do it<span className={styles.contributeArrow}><ContributeArrow /></span>
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
      <div className={styles.gradientContainer}>
        <div
          className={styles.transitionToBackgound}
        />
        {/* <Gradients /> */}
      </div>
    </header>
  );
}
