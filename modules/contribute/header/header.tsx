import styles from './header.module.scss';
import { TopBar } from '@/components/topBar';
import useLocale from '@/utils/useLocale';
import { LocalesMap } from '@/utils/useLocale';
import { clsx } from 'clsx';
import LoveIcon from '@/assets/icons/love.svg';
import OpenSourceIcon from '@/assets/icons/open-source.svg';
import { Gradients } from '@/components/gradients';
import ContributeArrow from '@/assets/images/contribute-arrow.svg';
import ContributeArrowInvert from '@/assets/images/contribute-arrow-invert.svg';
import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@/utils/useMediaQuery';

export const locales: LocalesMap = {
  ru: {
    appName: 'Гречка',
    description: (
      <>
        <span className={styles.appName}>Гречка</span> — это <span className={styles.hobbyProject}>хобби-проект</span>{' '}
        и я <span className={styles.notPlanEarnMoney}><span>не&nbsp;планирую на нём зарабатывать</span></span>,{' '}
        если вы хотите помочь, вот несколько способов, как это <span className={styles.contributeArrowWrapper}>сделать<Arrow /></span>
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
        and I <span className={styles.notPlanEarnMoney}><span>do&nbsp;not&nbsp;plan to earn money&nbsp;on&nbsp;it</span></span>,{' '}
        if you want to help, here are a few ways how to do <span className={styles.contributeArrowWrapper}>it <Arrow /></span>
      </>
    ),
    openSource: 'Open source',
    madeWithLove: 'Made with',
  },
};

function Arrow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isInvertArrow, setIsInvertArrow] = useState(false);
  const breakpoint640 = useMediaQuery('(max-width: 640px)');
  const breakpoint800 = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    const arrowWidth = breakpoint640 ? 260 : breakpoint800 ? 300 : 460;

    const handleResize = () => {
      if (rootRef.current) {
        const { left } = rootRef.current.getBoundingClientRect();

        if (window.innerWidth < left + arrowWidth) {
          setIsInvertArrow(true);
        } else {
          setIsInvertArrow(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint640, breakpoint800]);

  let left = isInvertArrow ? '-130px' : '26px';

  if (breakpoint640) {
    left = isInvertArrow ? '-95px' : '16px';
  }

  if (breakpoint800) {
    left = isInvertArrow ? '-95px' : '16px';
  }

  return (
    <span ref={rootRef} className={styles.contributeArrow}>
      <span style={{ width: '140px', display: 'inline-block' }} />
      <div style={{ left }}>
        {isInvertArrow ? <ContributeArrowInvert /> : <ContributeArrow />}
      </div>
    </span>
  )
}

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
