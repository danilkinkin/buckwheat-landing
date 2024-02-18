import useFrame from '@/utils/useFrame';
import { Fragment, useEffect, useRef } from 'react';
import styles from './cursor.module.css';
import { smooth } from '@/utils/smooth';

type CursorProps = {
  children: React.ReactNode;
};

export default function Cursor(props: CursorProps) {
  const { children } = props;
  const mousePosition = useRef({
    x: 0,
    y: 0,
    cursorPadding: 0,
    targetRect: null,
    target: { link: false, button: false },
    pressed: false,
  });
  const cursorRef = useRef(null);
  const prevCursorState = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    borderRadius: 0,
  });

  useEffect(() => {
    const updateTargetFromPath = (path: any[]) => {
      const isLink = path.find((el) => el?.tagName === 'A');
      const isButton = path.find((el) => el?.tagName === 'BUTTON');
      const cursorPadding = +(
        path
          .find((el) => el?.getAttribute?.('data-cursor-padding') !== null)
          ?.getAttribute?.('data-cursor-padding') || 16
      );

      let targetRect = null;

      if (isLink) {
        targetRect = isLink.getBoundingClientRect();
      }

      if (isButton) {
        targetRect = isButton.getBoundingClientRect();
      }

      mousePosition.current = {
        ...mousePosition.current,
        cursorPadding,
        targetRect,
        target: {
          link: Boolean(isLink),
          button: Boolean(isButton),
        },
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateTargetFromPath(event.composedPath());

      mousePosition.current = {
        ...mousePosition.current,
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleScroll = () => {
      updateTargetFromPath(
        document.elementsFromPoint(
          mousePosition.current.x,
          mousePosition.current.y
        )
      );
    };

    const handleMouseDown = (event: MouseEvent) => {
      mousePosition.current = {
        ...mousePosition.current,
        pressed: true,
      };
    };

    const handleMouseUp = (event: MouseEvent) => {
      mousePosition.current = {
        ...mousePosition.current,
        pressed: false,
      };
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useFrame((delta) => {
    let x = mousePosition.current.x;
    let y = mousePosition.current.y;
    let width = 30;
    let height = 30;
    let borderRadius = 0;

    let gapHover = mousePosition.current.cursorPadding;

    if (
      mousePosition.current.target.link ||
      mousePosition.current.target.button
    ) {
      const targetCenterX =
        mousePosition.current.targetRect.left +
        mousePosition.current.targetRect.width / 2;
      const targetCenterY =
        mousePosition.current.targetRect.top +
        mousePosition.current.targetRect.height / 2;

      width = mousePosition.current.targetRect.width + gapHover * 2;
      height = mousePosition.current.targetRect.height + gapHover * 2;
      x = x * 0.05 + targetCenterX * 0.95 - width / 2;
      y = y * 0.05 + targetCenterY * 0.95 - height / 2;
      borderRadius = Math.min(width / 2, height / 2);
    } else {
      width = 30;
      height = 30;
      x = x - width / 2;
      y = y - height / 2;
      borderRadius = 15;
    }

    if (mousePosition.current.pressed) {
      width -= 10;
      height -= 10;
      x += 5;
      y += 5;
    }

    width = smooth(prevCursorState.current.width, width, 0.02 * delta);
    height = smooth(prevCursorState.current.height, height, 0.02 * delta);
    x = smooth(prevCursorState.current.x, x, 0.02 * delta);
    y = smooth(prevCursorState.current.y, y, 0.02 * delta);
    borderRadius = smooth(
      prevCursorState.current.borderRadius,
      borderRadius,
      0.02 * delta
    );

    prevCursorState.current = { x, y, width, height, borderRadius };

    //return;

    cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    cursorRef.current.style.width = `${width}px`;
    cursorRef.current.style.height = `${height}px`;
    cursorRef.current.style.borderRadius = `${Math.min(borderRadius, 36 + gapHover)}px`;
  });

  return (
    <Fragment>
      <div ref={cursorRef} className={styles.root} />
      {children}
    </Fragment>
  );
}
