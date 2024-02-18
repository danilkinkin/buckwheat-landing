import styles from './githubCardButton.module.scss';
import Link, { LinkProps } from 'next/link';
import LinkIcon from '@/assets/icons/link.svg';
import clsx from 'clsx';
import CursorEffect from '../cursor/cursorEffect';

type GithubCardButtonProps = Omit<LinkProps, 'href'> & { className?: string };

export function GithubCardButton(props: GithubCardButtonProps) {
  const { className: restCalssName, ...restProps } = props;

  return (
    <CursorEffect>
      <div className={clsx(styles.card, restCalssName)}>
      <Link
        {...restProps}
        target="_blank"
        href="https://github.com/danilkinkin/buckwheat"
      >
        <div className={styles.content}>
          <span className={styles.storeNameText}>GitHub</span>
          <LinkIcon className={styles.linkIcon} />
        </div>
      </Link>
    </div>
    </CursorEffect>
  );
}
