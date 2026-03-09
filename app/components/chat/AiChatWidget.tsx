// File: app/components/chat/AiChatWidget.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatFab, ChatFabPosition } from "./ChatFab";

/**
 * Global AI chat widget: floating button that navigates to chat page.
 */
export function AiChatWidget() {
  const router = useRouter();

  const [fabPosition, setFabPosition] = useState<ChatFabPosition>({ bottom: 96, right: 16 });

  // Load saved position from localStorage (if any)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("ai-chat-widget-position");
      if (!raw) return;
      const parsed = JSON.parse(raw) as ChatFabPosition;
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        typeof parsed.bottom === "number" &&
        typeof parsed.right === "number"
      ) {
        setFabPosition(parsed);
      }
    } catch {
      // ignore parse error
    }
  }, []);

  const handleFabPositionChange = useCallback((pos: ChatFabPosition) => {
    setFabPosition(pos);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ai-chat-widget-position", JSON.stringify(pos));
    }
  }, []);

  const goToChatPage = useCallback(() => {
    router.push("/chat");
  }, [router]);

  return (
    <>
      <ChatFab onClick={goToChatPage} position={fabPosition} onPositionChange={handleFabPositionChange} />
    </>
  );
}
