import styles from './googlePlayLink.module.scss';
import Link, { LinkProps } from 'next/link';
import LinkIcon from '@/assets/icons/link.svg';
import useLocale, { LocalesMap } from '@/utils/useLocale';
import clsx from 'clsx';
import { CursorEffect } from '@/components/cursor';

const locales: LocalesMap = {
  ru: {
    getText: 'Доступно на Google Play',
  },
  en: {
    getText: 'Get it on Google Play',
  },
};

type GooglePlayLinkProps = Omit<LinkProps, 'href'> & { className?: string };

export function GooglePlayLink(props: GooglePlayLinkProps) {
  const { className: restCalssName, ...restProps } = props;
  const t = useLocale(locales);

  return (
    <CursorEffect
      effectDistance={48}
      effectForce={4}
      cursorPadding={0}
      className={clsx(styles.rootWrapper, restCalssName)}
    >
      <Link
        {...restProps}
        className={clsx(styles.root)}
        target="_blank"
        href="https://play.google.com/store/apps/details?id=com.danilkinkin.buckwheat&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
      >
        {t('getText')} <LinkIcon />
      </Link>
    </CursorEffect>
  );
}
