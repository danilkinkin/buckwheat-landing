import styles from './googlePlayButton.module.css';
import Link, { LinkProps } from 'next/link';
import QRCodeSvg from '@/assets/images/download-gp-qr-code.svg';
import LinkIcon from '@/assets/icons/link.svg';
import useLocale, { LocalesMap } from '@/utils/useLocale';
import clsx from 'clsx';

const locales: LocalesMap = {
  ru: {
    getText: 'Доступно на',
  },
  en: {
    getText: 'Get it on',
  },
};

type GooglePlayButtonProps = Omit<LinkProps, 'href'> & { className?: string };

export function GooglePlayButton(props: GooglePlayButtonProps) {
  const { className: restCalssName, ...restProps } = props;
  const t = useLocale(locales);

  return (
    <div className={clsx(styles.card, restCalssName)}>
      <Link
        {...restProps}
        target="_blank"
        href="https://play.google.com/store/apps/details?id=com.danilkinkin.buckwheat&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
      >
        <div className={styles.content}>
          <QRCodeSvg className={styles.qrCode} />
          <div className={styles.textContainer}>
            <LinkIcon className={styles.linkIcon} />
            <span className={styles.getText}>{t('getText')}</span>
            <span className={styles.storeNameText}>Google Play</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
