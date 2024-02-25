import { smooth } from '@/utils/smooth';
import useFrame from '@/utils/useFrame';
import { useEffect, useRef } from 'react';

type CursorEffectProps = {
  children: React.ReactNode;
  className?: string;
  effectDistance?: number;
  effectForce?: number;
  cursorPadding?: number;
  cursorBorderRadius?: number;
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

export function CursorEffect(props: CursorEffectProps) {
  const {
    children,
    className,
    effectDistance = 128,
    effectForce = 6,
    cursorPadding = 16,
    cursorBorderRadius = 0,
  } = props;
  const cursorAffectorRef = useRef<HTMLDivElement>(null);
  const cursorAffectoContainerrRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef<{
    x: number;
    y: number;
    targetRect: DOMRect | null;
  }>({
    x: 0,
    y: 0,
    targetRect: null,
  });
  const prevCursorState = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let isTouch = false;

    const handleMouseMove = (event: MouseEvent) => {
      if (isTouch) return;

      let targetRect =
        cursorAffectoContainerrRef.current?.getBoundingClientRect() || null;

      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
        targetRect,
      };
    };

    const handleScroll = () => {
      if (isTouch) return;

      let targetRect =
        cursorAffectoContainerrRef.current?.getBoundingClientRect() || null;

      mousePosition.current = {
        ...mousePosition.current,
        targetRect,
      };
    };

    const handlePointerDown = (event: PointerEvent) => {
      isTouch = event.pointerType === 'touch';

      let targetRect =
        cursorAffectoContainerrRef.current?.getBoundingClientRect() || null;

      mousePosition.current = {
        ...mousePosition.current,
        targetRect,
        x: -9999999,
        y: -9999999,
      };
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
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

    if (cursorAffectorRef.current) {
      cursorAffectorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  return (
    <div ref={cursorAffectoContainerrRef} className={className}>
      <div
        ref={cursorAffectorRef}
        style={{ width: '100%', height: '100%' }}
        data-cursor-effect
        data-cursor-padding={cursorPadding}
        data-cursor-border-radius={cursorBorderRadius}
      >
        {children}
      </div>
    </div>
  );
}
