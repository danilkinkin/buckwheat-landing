import styles from './githubButton.module.scss';
import Link, { LinkProps } from 'next/link';
import GithubIcon from '@/assets/icons/github.svg';
import clsx from 'clsx';

type GithubButtonProps = Omit<LinkProps, 'href'> & { className?: string };

export function GithubButton(props: GithubButtonProps) {
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
