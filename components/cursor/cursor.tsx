import useFrame from '@/utils/useFrame';
import { Fragment, useEffect, useRef } from 'react';
import styles from './cursor.module.css';
import { smooth } from '@/utils/smooth';

type CursorProps = {
  children: React.ReactNode;
};

export function Cursor(props: CursorProps) {
  const { children } = props;
  const mousePosition = useRef({
    x: 0,
    y: 0,
    cursorPadding: 0,
    cursorBorderRadius: 0,
    targetRect: null,
    target: { link: false, button: false, cursorEffector: false },
    pressed: false,
    active: false,
  });
  const cursorRef = useRef(null);
  const cursorSpotRef = useRef(null);
  const prevCursorState = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    borderRadius: 0,
    isRendered: false,
  });

  useEffect(() => {
    let isReadyForHide = false;
    let isTouch = false;

    const updateTargetFromPath = (path: any[]) => {
      const isLink = path.find((el) => el?.tagName === 'A');
      const isButton = path.find((el) => el?.tagName === 'BUTTON');
      const isCursorEffector = path.find(
        (el) => el?.getAttribute?.('data-cursor-effect')
      );
      const cursorPadding = +(
        path
          .find((el) => el?.getAttribute?.('data-cursor-padding') !== null)
          ?.getAttribute?.('data-cursor-padding') || 16
      );

      const cursorBorderRadius = +(
        path
          .find(
            (el) => el?.getAttribute?.('data-cursor-border-radius') !== null
          )
          ?.getAttribute?.('data-cursor-border-radius') || 0
      );

      let targetRect = null;

      if (isLink) {
        targetRect = isLink.getBoundingClientRect();
      }

      if (isButton) {
        targetRect = isButton.getBoundingClientRect();
      }

      if (isCursorEffector) {
        targetRect = isCursorEffector.getBoundingClientRect();
      }

      mousePosition.current = {
        ...mousePosition.current,
        cursorPadding,
        cursorBorderRadius,
        targetRect,
        target: {
          link: Boolean(isLink),
          button: Boolean(isButton),
          cursorEffector: Boolean(isCursorEffector),
        },
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isTouch) return;
      updateTargetFromPath(event.composedPath());

      if (!mousePosition.current.active) {
        prevCursorState.current = {
          ...prevCursorState.current,
          x: event.clientX,
          y: event.clientY,
        };
      }

      isReadyForHide = false;

      mousePosition.current = {
        ...mousePosition.current,
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      isReadyForHide = true;

      setTimeout(() => {
        if (!isReadyForHide) return;

        mousePosition.current = {
          ...mousePosition.current,
          active: false,
        };
      }, 300);
    };

    const handleScroll = () => {
      if (isTouch) return;
      updateTargetFromPath(
        document.elementsFromPoint(
          mousePosition.current.x,
          mousePosition.current.y
        )
      );
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (isTouch) return;
      updateTargetFromPath(event.composedPath());
      mousePosition.current = {
        ...mousePosition.current,
        pressed: true,
      };
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (isTouch) return;
      updateTargetFromPath(event.composedPath());
      mousePosition.current = {
        ...mousePosition.current,
        pressed: false,
      };
    };

    const handlePointerDown = (event: PointerEvent) => {
      isTouch = event.pointerType === 'touch';

      handleMouseLeave();
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);


    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.document.body.removeEventListener('mouseleave', handleMouseLeave);
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
    const targetRect = mousePosition.current.targetRect;

    if (!mousePosition.current.active) {
      width = 0;
      height = 0;
      borderRadius = 15;
    } else if (
      mousePosition.current.target.link ||
      mousePosition.current.target.button ||
      mousePosition.current.target.cursorEffector
    ) {
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      width = targetRect.width + gapHover * 2;
      height = targetRect.height + gapHover * 2;

      x = x * 0.05 + targetCenterX * 0.95 - width / 2;
      y = y * 0.05 + targetCenterY * 0.95 - height / 2;
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
      gapHover -= 5;
    }

    if (mousePosition.current.cursorBorderRadius) {
      borderRadius = mousePosition.current.cursorBorderRadius + gapHover;
    } else {
      borderRadius = Math.min(width / 2, height / 2);
    }

    x = smooth(prevCursorState.current.x, x, 0.02 * delta);
    y = smooth(prevCursorState.current.y, y, 0.02 * delta);
    width = smooth(prevCursorState.current.width, width, 0.02 * delta);
    height = smooth(prevCursorState.current.height, height, 0.02 * delta);
    borderRadius = smooth(
      prevCursorState.current.borderRadius,
      borderRadius,
      0.02 * delta
    );

    prevCursorState.current = {
      ...prevCursorState.current,
      x,
      y,
      width,
      height,
      borderRadius,
    };

    cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    cursorRef.current.style.width = `${width}px`;
    cursorRef.current.style.height = `${height}px`;
    cursorRef.current.style.borderRadius = `${Math.min(borderRadius, 36 + gapHover)}px`;

    const size = Math.max((width + height) / 2, 48);

    cursorSpotRef.current.style.transform = `translate(${mousePosition.current.x - x - size / 2}px, ${mousePosition.current.y - y - size / 2}px)`;
    cursorSpotRef.current.style.width = `${size}px`;
    cursorSpotRef.current.style.height = `${size}px`;

    if (!prevCursorState.current.isRendered && mousePosition.current.active) {
      prevCursorState.current.isRendered = true;

      cursorRef.current.classList.add(styles.rootShow);
    } else if (prevCursorState.current.isRendered && width < 0.1) {
      prevCursorState.current.isRendered = false;

      cursorRef.current.classList.remove(styles.rootShow);
    }
  });

  return (
    <Fragment>
      <div ref={cursorRef} className={styles.root}>
        <div ref={cursorSpotRef} className={styles.spot} />
      </div>
      {children}
    </Fragment>
  );
}
