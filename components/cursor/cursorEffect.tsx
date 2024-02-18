import { smooth } from '@/utils/smooth';
import useFrame from '@/utils/useFrame';
import { useEffect, useRef } from 'react';

type CursorEffectProps = {
  children: React.ReactNode;
  className?: string;
  effectDistance?: number;
  effectForce?: number;
  cursorPadding?: number;
};

const clamp = (value: number, min: number, max: number) => {
  const minOffset = Math.max(value - min, 0);

  return Math.min(minOffset / (max - min), 1);
};

const inRect = (x: number, y: number, rect: DOMRect, gap: number = 0) => {
  return (
    rect.left - gap < x &&
    x < rect.right + gap &&
    rect.top - gap < y &&
    y < rect.bottom + gap
  );
};

export default function CursorEffect(props: CursorEffectProps) {
  const {
    children,
    className,
    effectDistance = 128,
    effectForce = 6,
    cursorPadding = 16,
  } = props;
  const cursorAffectorRef = useRef(null);
  const cursorAffectoContainerrRef = useRef(null);
  const mousePosition = useRef({
    x: 0,
    y: 0,
    targetRect: null,
  });
  const prevCursorState = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      let targetRect =
        cursorAffectoContainerrRef.current.getBoundingClientRect();

      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
        targetRect,
      };
    };

    const handleScroll = () => {
      let targetRect =
        cursorAffectoContainerrRef.current.getBoundingClientRect();

      mousePosition.current = {
        ...mousePosition.current,
        targetRect,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((delta) => {
    let x = 0;
    let y = 0;

    const gap = effectDistance;
    const offsetMax = effectForce;

    const mousePos = mousePosition.current;
    const rect = mousePosition.current.targetRect;

    const isActive = rect && inRect(mousePos.x, mousePos.y, rect, gap);

    if (isActive) {
      const halfWidth = rect.width / 2;
      const targetCenterX = rect.left + halfWidth;
      const leftStart = rect.left - gap;
      const leftMiddle = rect.left - offsetMax;
      const rightMiddle = rect.right + offsetMax;
      const rightEnd = rect.right + gap;

      const affectX =
        clamp(mousePos.y, rect.top - gap, rect.top) *
        (1 - clamp(mousePos.y, rect.bottom, rect.bottom + gap));

      if (mousePos.x < leftMiddle) {
        x = -clamp(mousePos.x, leftStart, leftMiddle);
      } else if (mousePos.x < targetCenterX) {
        x = -(1 - clamp(mousePos.x, leftMiddle, targetCenterX));
      } else if (mousePos.x < rightMiddle) {
        x = clamp(mousePos.x, targetCenterX, rightMiddle);
      } else if (mousePos.x < rightEnd) {
        x = 1 - clamp(mousePos.x, rightMiddle, rightEnd);
      }

      x = x * affectX;

      const halfHeight = rect.height / 2;
      const targetCenterY = rect.top + halfHeight;
      const topStart = rect.top - gap;
      const topMiddle = rect.top - offsetMax;
      const bottomMiddle = rect.bottom + offsetMax;
      const bottomEnd = rect.bottom + gap;

      const affectY =
        clamp(mousePos.x, rect.left - gap, rect.left) *
        (1 - clamp(mousePos.x, rect.right, rect.right + gap));

      if (mousePos.y < topMiddle) {
        y = -clamp(mousePos.y, topStart, topMiddle);
      } else if (mousePos.y < targetCenterY) {
        y = -(1 - clamp(mousePos.y, topMiddle, targetCenterY));
      } else if (mousePos.y < bottomMiddle) {
        y = clamp(mousePos.y, targetCenterY, bottomMiddle);
      } else if (mousePos.y < bottomEnd) {
        y = 1 - clamp(mousePos.y, bottomMiddle, bottomEnd);
      }

      y = y * affectY;

      x = x * offsetMax;
      y = y * offsetMax;
    }

    x = smooth(prevCursorState.current.x, x, 0.02 * delta);
    y = smooth(prevCursorState.current.y, y, 0.02 * delta);

    prevCursorState.current = { x, y };

    cursorAffectorRef.current.style.transform = `translate(${x}px, ${y}px)`;
  });

  return (
    <div ref={cursorAffectoContainerrRef} className={className}>
      <div
        ref={cursorAffectorRef}
        style={{ width: '100%', height: '100%' }}
        data-cursor-padding={cursorPadding}
      >
        {children}
      </div>
    </div>
  );
}
