import useLocale, { LocalesMap } from '@/utils/useLocale';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './langSwitcher.module.scss';
import LanguageIcon from '@/assets/icons/language.svg';
import CursorEffect from '../cursor/cursorEffect';

type LangSwitcherProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const locales: LocalesMap = {
  ru: {
    chooseHeader: 'Выберете язык',
  },
  en: {
    chooseHeader: 'Choose language',
  },
};

const localesMap: { [key: string]: string } = {
  en: 'English',
  ru: 'Русский',
};

export function LangSwitcher(props: LangSwitcherProps) {
  const { className: restClassName, ...restProps } = props;
  const router = useRouter();
  const selectorRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const t = useLocale(locales);
  const { pathname, asPath, query } = router;

  useEffect(() => {
    if (!open) return;

    const handleClose = (event: any) => {
      setOpen(
        event.composedPath().includes(selectorRef.current) ||
          event.composedPath().includes(buttonRef.current)
      );
    };

    addEventListener('click', handleClose, false);

    return () => removeEventListener('click', handleClose, false);
  }, [open]);

  const handleSetLanguage = (locale: string) => () => {
    router.push({ pathname, query }, asPath, { locale });
    setOpen(false);
  };

  return (
    <div className={clsx(styles.langSwitcher, restClassName)} {...restProps}>
      <CursorEffect
        effectDistance={48}
        effectForce={4}
        cursorPadding={8}
        className={clsx(styles.langSwitcherRoot)}
      >
        <button
          ref={buttonRef}
          className={clsx(styles.currentLanguage, open && styles.hideCurrent)}
          onClick={() => setOpen(true)}
        >
          <LanguageIcon />{' '}
          <span className={styles.currentLangLabel}>
            {localesMap[router.locale || 'en']}
          </span>
        </button>
      </CursorEffect>
      <div
        ref={selectorRef}
        className={clsx(styles.selector, open && styles.openSelector)}
      >
        <h5 className={styles.header}>{t('chooseHeader')}</h5>
        <ul>
          {Object.keys(localesMap).map((locale) => (
            <li key={locale} onClick={handleSetLanguage(locale)}>
              {localesMap[locale]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
