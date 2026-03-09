"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "app/hooks/useChat";
import { ChatPanel } from "app/components/chat";
import { useFooter } from "app/context/FooterContext";

export default function ChatPage() {
  const router = useRouter();
  const { messages, isLoading, error, sendMessage, clearError, clearMessages } = useChat();
  const { setFooterVisible } = useFooter();
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      // Show footer again when leaving this page
      setFooterVisible(true);
    };
  }, [setFooterVisible]);

  return (
    <ChatPanel
      onClose={handleClose}
      messages={messages}
      isLoading={isLoading}
      error={error}
      onSendMessage={sendMessage}
      onClearError={clearError}
      onClearMessages={clearMessages}
    />
  );
}
