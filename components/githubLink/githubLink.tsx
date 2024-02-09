import styles from './githubLink.module.scss';
import Link, { LinkProps } from 'next/link';
import GithubIcon from '@/assets/icons/github.svg';
import clsx from 'clsx';

type GithubLinkProps = Omit<LinkProps, 'href'> & { className?: string };

export function GithubLink(props: GithubLinkProps) {
  const { className: restClassName, ...restProps } = props;

  return (
    <Link
      {...restProps}
      className={clsx(styles.link, restClassName)}
      target="_blank"
      href="https://github.com/danilkinkin/buckwheat"
      prefetch={false}
    >
      <GithubIcon className={styles.linkIcon} />
    </Link>
  );
}
