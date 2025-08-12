// src/AlertModal.tsx
"use client";

import { useEffect, useState, CSSProperties } from "react";
import ConfirmButton from "./_Conponents/ConfirmButton";

type AlertModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;

  confirmText?: string;
  alarmText?: string;
};

export default function AlertModal({
  isOpen,
  message,
  onClose,
  confirmText,
  alarmText,
}: AlertModalProps) {
  const [show, setShow] = useState(false);

  // Control mount/unmount for transition
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      setShow(true);
    } else {
      timer = setTimeout(() => setShow(false), 300); // remove after transition
    }
    return () => timer && clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 300ms ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
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
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: 700,
            color: "#1f2937",
            margin: 0,
          }}
        >
          ❗ {alarmText || "Alarm"}
        </h2>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.5rem",
            color: "#374151",
            marginTop: "1.5rem",
            marginBottom: 0,
          }}
        >
          {message}
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <ConfirmButton onClick={onClose}>
            {confirmText || "Confirm"}
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
}