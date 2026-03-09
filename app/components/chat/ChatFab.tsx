// File: app/components/chat/ChatFab.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

export interface ChatFabPosition {
  bottom: number;
  right: number;
}

export interface ChatFabProps {
  onClick: () => void;
  ariaLabel?: string;
  position: ChatFabPosition;
  onPositionChange?: (position: ChatFabPosition) => void;
}

export function ChatFab({
  onClick,
  ariaLabel = "Mở trợ lý tài chính AI",
  position,
  onPositionChange,
}: ChatFabProps) {
  const isDraggingRef = useRef(false);
  const lastDragPosRef = useRef<ChatFabPosition | null>(null);

  // Local position for smooth dragging without forcing parent re-renders
  const [displayPosition, setDisplayPosition] = useState<ChatFabPosition>(position);
  // Only animate when snapping to side, not on every drag frame
  const [isSnapping, setIsSnapping] = useState(false);

  // Sync when parent position changes (e.g. initial load or persisted restore)
  useEffect(() => {
    setDisplayPosition(position);
  }, [position.bottom, position.right]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!onPositionChange || typeof window === "undefined") return;

      // Prevent page scroll / text selection while dragging on mobile
      event.preventDefault();
      event.stopPropagation();

      isDraggingRef.current = false;
      setIsSnapping(false);

      const startX = event.clientX;
      const startY = event.clientY;
      const startBottom = position.bottom;
      const startRight = position.right;

      const handleMove = (moveEvent: PointerEvent) => {
        isDraggingRef.current = true;

        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        const btnSize = 56; // approx h-14 w-14
        const padding = 8;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let nextRight = startRight - dx;
        let nextBottom = startBottom - dy;

        // Clamp within viewport
        const maxRight = viewportWidth - btnSize - padding;
        const maxBottom = viewportHeight - btnSize - padding;

        nextRight = Math.min(Math.max(padding, nextRight), Math.max(padding, maxRight));
        nextBottom = Math.min(Math.max(padding, nextBottom), Math.max(padding, maxBottom));

        const nextPos = { bottom: nextBottom, right: nextRight };
        lastDragPosRef.current = nextPos;
        setDisplayPosition(nextPos);
      };

      const handleUp = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);

        // On release, snap horizontally to nearest side (left or right), keeping current bottom.
        const btnSize = 56;
        const padding = 8;
        const viewportWidth = window.innerWidth;
        const last = lastDragPosRef.current ?? displayPosition;

        // Compute button center X from right offset to decide nearest side
        const centerX = viewportWidth - (last.right + btnSize / 2);
        const rightSnap = padding;
        const leftSnap = viewportWidth - btnSize - padding;
        const snapRight = centerX < viewportWidth / 2 ? leftSnap : rightSnap;

        const snapped = { bottom: last.bottom, right: snapRight };
        // Enable smooth animation only for this snap
        setIsSnapping(true);
        setDisplayPosition(snapped);
        if (onPositionChange) {
          onPositionChange(snapped);
        }

        // Reset dragging flag after pointer up
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 0);
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    },
    [onPositionChange, position.bottom, position.right],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDraggingRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick();
    },
    [onClick],
  );

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`fixed z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#0046B0] text-white shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0046B0] focus:ring-offset-2 select-none touch-none ${
        isSnapping ? "transition-all duration-200" : ""
      }`}
      style={{
        bottom: `${displayPosition.bottom}px`,
        right: `${displayPosition.right}px`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
