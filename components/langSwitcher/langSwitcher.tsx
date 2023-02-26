import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './langSwitcher.module.css';

type LangSwitcherProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const localesShortMap: { [key: string]: string } = {
  en: 'eng',
  ru: 'рус',
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
      <span
        ref={buttonRef}
        className={styles.currentLanguage}
        onClick={() => setOpen(true)}
      >
        {localesMap[router.locale || 'en']}
      </span>
      <div
        ref={selectorRef}
        className={clsx(styles.selector, open && styles.openSelector)}
      >
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
