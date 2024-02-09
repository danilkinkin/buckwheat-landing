import useLocale, { LocalesMap } from '@/utils/useLocale';
import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './footer.module.scss';
import { GithubButton } from '../githubButton';

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const localesMap: LocalesMap = {
  ru: {
    madeBy: 'сделано',
  },
  en: {
    madeBy: 'made by',
  },
};

export function Footer(props: CardProps) {
  const { className: restClassName, ...restProps } = props;
  const t = useLocale(localesMap);

  return (
    <footer className={clsx(restClassName, styles.footer)} {...restProps}>
      <p className={styles.author}>
        {`${t('madeBy')} `}
        <Link
          className={styles.danilkinkin}
          href="https://danilkinkin.com"
          target="_blank"
          prefetch={false}
        >
          @danilkinkin
        </Link>
      </p>

      <hr />

      <GithubButton />
    </footer>
  );
}
