import { clsx } from 'clsx';
import styles from './card.module.scss';
import { ibmPlexMono } from '@/styles/fonts';
import React, { forwardRef } from 'react';

type CardProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'title'
> & {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  backdropOnText?: boolean;
  classes?: { [key: string]: string };
};

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  props: CardProps,
  ref
) {
  const {
    title,
    subtitle,
    backdropOnText,
    children,
    classes = {},
    className: restClassName,
    ...restProps
  } = props;

  return (
    <div ref={ref} className={clsx(styles.card, restClassName)} {...restProps}>
      <div className={clsx(styles.textWrapper, classes.textWrapper)}>
        <h3
          className={clsx(ibmPlexMono.className, styles.title, classes.title)}
        >
          <span className={clsx(backdropOnText && styles.backdropOnText)}>
            {title}
          </span>
        </h3>
        {backdropOnText && (
          <h3
            className={clsx(
              ibmPlexMono.className,
              styles.title,
              classes.title,
              styles.backdropTextHelper
            )}
          >
            <span className={clsx(backdropOnText && styles.backdropOnText)}>
              {title}
            </span>
          </h3>
        )}
      </div>
      {subtitle && (
        <div className={clsx(styles.textWrapper, classes.textWrapper)}>
          <p className={clsx(styles.subtitle, classes.subtitle)}>
            <span className={clsx(backdropOnText && styles.backdropOnText)}>
              {subtitle}
            </span>
          </p>
          {backdropOnText && (
            <p
              className={clsx(
                styles.subtitle,
                classes.subtitle,
                styles.backdropTextHelper
              )}
            >
              <span className={clsx(backdropOnText && styles.backdropOnText)}>
                {subtitle}
              </span>
            </p>
          )}
        </div>
      )}
      {children && (
        <div className={clsx(styles.content, classes.content)}>{children}</div>
      )}
    </div>
  );
});

export { Card };
