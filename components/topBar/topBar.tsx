import styles from './topBar.module.scss';
import { LangSwitcher } from '@/components/langSwitcher';
import { Logo, LogoType } from '@/components/logo';
import { GithubLink } from '@/components/githubLink';
import { GooglePlayLink } from '@/components/googlePlayLink';
import { useRef } from 'react';
import useScroll from '@/utils/useScroll';
import { CursorEffect } from '@/components/cursor';
import Link from 'next/link';
import { useRouter } from 'next/router';

type TopBarProps = {
  notHide?: boolean;
};

export function TopBar(props: TopBarProps) {
  const { notHide = false } = props;
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);

  useScroll((scrollY, deltaTime, time) => {
    if (notHide) {
      return;
    }

    if (rootRef.current) {
      rootRef.current.style.transform = `translateY(${-Math.expm1(scrollY / 6)}px)`;
    }
  });

  return (
    <div className={styles.root} ref={rootRef}>
      {router.pathname === '/' && (
        <Logo className={styles.logo} variant={LogoType.Full} />
      )}
      {router.pathname !== '/' && (
        <CursorEffect
          cursorPadding={4}
          cursorBorderRadius={26}
          className={styles.logo}
        >
          <Link href="/" className={styles.homeLink}>
            <Logo variant={LogoType.Full} />
          </Link>
        </CursorEffect>
      )}
      <GooglePlayLink className={styles.googlePlayLink} />
      <GithubLink />
      <LangSwitcher />
    </div>
  );
}
