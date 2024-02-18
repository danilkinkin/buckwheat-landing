import styles from './githubLink.module.scss';
import Link, { LinkProps } from 'next/link';
import GithubIcon from '@/assets/icons/github.svg';
import clsx from 'clsx';
import CursorEffect from '../cursor/cursorEffect';

type GithubLinkProps = Omit<LinkProps, 'href'> & { className?: string };

export function GithubLink(props: GithubLinkProps) {
  const { className: restClassName, ...restProps } = props;

  return (
    <CursorEffect
      effectDistance={48}
      effectForce={4}
      cursorPadding={8}
      className={clsx(styles.linkWrapper)}
    >
      <Link
        {...restProps}
        className={clsx(styles.link, restClassName)}
        target="_blank"
        href="https://github.com/danilkinkin/buckwheat"
        prefetch={false}
      >
        <GithubIcon className={styles.linkIcon} />
      </Link>
    </CursorEffect>
  );
}
