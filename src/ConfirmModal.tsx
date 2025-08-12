// src/ConfirmModal.tsx
"use client";

import { useEffect, useId, useRef, useState, CSSProperties } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onYes: () => void;
  onNo: () => void;

  title?: string;
  yesText?: string;
  noText?: string;
  closeOnBackdrop?: boolean;
};

export default function ConfirmModal({
  isOpen,
  message,
  onYes,
  onNo,
  title = "Confirm",
  yesText = "Yes",
  noText = "No",
  closeOnBackdrop = true,
}: ConfirmModalProps) {
  const [show, setShow] = useState(false);
  const titleId = useId();
  const descId = useId();
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);

  // Mount/unmount transition
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      setShow(true);
    } else {
      timer = setTimeout(() => setShow(false), 300);
    }
    return () => timer && clearTimeout(timer);
  }, [isOpen]);

  // Focus "Yes" button on open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => yesBtnRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ESC key closes modal (triggers onNo)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onNo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onNo]);

  if (!isOpen && !show) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onNo();
  };

  // === 스타일 객체 ===
  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    opacity: isOpen ? 1 : 0,
    transition: "opacity 300ms ease",
  };

  const contentStyle: CSSProperties = {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    width: "100%",
    maxWidth: "28rem",
    padding: "2rem",
    textAlign: "center",
    transform: isOpen ? "translateY(0)" : "translateY(2.5rem)",
    opacity: isOpen ? 1 : 0,
    transition: "transform 300ms ease, opacity 300ms ease",
  };

  const titleStyle: CSSProperties = {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 700,
    color: "#1f2937",
    margin: 0,
  };

  const messageStyle: CSSProperties = {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    color: "#374151",
    marginTop: "1.5rem",
    marginBottom: 0,
  };

  const actionsStyle: CSSProperties = {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
  };

  const baseBtnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 150ms ease, border-color 150ms ease, color 150ms ease",
    outline: "none",
  };

  const yesBtnStyle: CSSProperties = {
    ...baseBtnStyle,
    color: "#fff",
    background: "#2563eb",
    border: "none",
  };

  const noBtnStyle: CSSProperties = {
    ...baseBtnStyle,
    color: "#374151",
    background: "#fff",
    border: "1px solid #d1d5db",
  };

  return (
    <div
      style={overlayStyle}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div onClick={(e) => e.stopPropagation()} style={contentStyle}>
        <h2 id={titleId} style={titleStyle}>
          {title}
        </h2>

        <p id={descId} style={messageStyle}>
          {message}
        </p>

        <div style={actionsStyle}>
          <button
            ref={yesBtnRef}
            type="button"
            onClick={onYes}
            style={yesBtnStyle}
          >
            {yesText}
          </button>
          <button type="button" onClick={onNo} style={noBtnStyle}>
            {noText}
          </button>
        </div>
      </div>
    </div>
  );
}