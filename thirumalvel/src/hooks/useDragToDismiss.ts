import { useRef, useEffect, useState, useCallback } from "react";

interface UseDragToDismissOptions {
  onClose: () => void;
  isOpen: boolean;
  threshold?: number;
}

export function useDragToDismiss({ onClose, isOpen, threshold = 85 }: UseDragToDismissOptions) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);
  const currentYRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isFromHandleRef = useRef<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  // Reset transform when opened/closed
  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
      sheetRef.current.style.transition = "";
    }
    isDraggingRef.current = false;
    startYRef.current = null;
    currentYRef.current = 0;
  }, [isOpen]);

  const handleStart = useCallback((clientY: number, fromHandle: boolean = false) => {
    const el = sheetRef.current;
    if (!el) return;

    // If not from handle, only drag down if scroll position is at the very top
    if (!fromHandle && el.scrollTop > 5) {
      return;
    }

    startYRef.current = clientY;
    currentYRef.current = 0;
    isDraggingRef.current = true;
    isFromHandleRef.current = fromHandle;
    setIsDragging(true);

    el.style.transition = "none";
  }, []);

  const handleMove = useCallback((clientY: number, e?: Event) => {
    if (!isDraggingRef.current || startYRef.current === null) return;
    const el = sheetRef.current;
    if (!el) return;

    const deltaY = clientY - startYRef.current;

    // Only allow dragging downwards
    if (deltaY > 0) {
      if (e && e.cancelable) {
        // Prevent default native rubber-banding
        e.preventDefault();
      }
      currentYRef.current = deltaY;
      // Apple-like resistance easing if pulled far
      const dampedY = deltaY < 200 ? deltaY : 200 + (deltaY - 200) * 0.45;
      el.style.transform = `translateY(${dampedY}px)`;
    } else {
      // If dragged upwards, lock at 0
      currentYRef.current = 0;
      el.style.transform = "translateY(0px)";
    }
  }, []);

  const handleEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    const el = sheetRef.current;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (!el) {
      startYRef.current = null;
      return;
    }

    const deltaY = currentYRef.current;
    startYRef.current = null;
    currentYRef.current = 0;

    if (deltaY > threshold) {
      // Smooth slide down to close
      el.style.transition = "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out";
      el.style.transform = "translateY(100%)";
      el.style.opacity = "0";
      setTimeout(() => {
        onClose();
      }, 200);
    } else {
      // Spring back up to normal position
      el.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "translateY(0px)";
      setTimeout(() => {
        if (el) {
          el.style.transform = "";
          el.style.transition = "";
        }
      }, 260);
    }
  }, [onClose, threshold]);

  // Touch event listeners for the handle
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientY, true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientY, e.nativeEvent);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Content touch listeners (checks scrollTop <= 0)
  const contentTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientY, false);
  };

  const contentTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientY, e.nativeEvent);
  };

  const contentTouchEnd = () => {
    handleEnd();
  };

  // Pointer event listeners (desktop mouse drag on handle)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only left click
    handleStart(e.clientY, true);

    const onPointerMove = (ev: PointerEvent) => {
      handleMove(ev.clientY, ev);
    };

    const onPointerUp = () => {
      handleEnd();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return {
    sheetRef,
    isDragging,
    handleProps: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onPointerDown: handlePointerDown,
    },
    contentProps: {
      onTouchStart: contentTouchStart,
      onTouchMove: contentTouchMove,
      onTouchEnd: contentTouchEnd,
    },
  };
}
