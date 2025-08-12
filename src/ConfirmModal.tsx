// src/ConfirmModal.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onYes: () => void;
  onNo: () => void;

  title?: string;             // Top title (e.g., "Are you sure?")
  yesText?: string;           // Label for the "Yes" button (default: "Yes")
  noText?: string;            // Label for the "No" button (default: "No")
  closeOnBackdrop?: boolean;  // Whether clicking the backdrop closes the modal (default: true)
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

  // Handle mount/unmount transition state
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      setShow(true);
    } else {
      timer = setTimeout(() => setShow(false), 300); // Wait for transition before unmount
    }
    return () => timer && clearTimeout(timer);
  }, [isOpen]);

  // Focus the "Yes" button when the modal opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => yesBtnRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close modal with ESC key (equivalent to clicking "No")
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

  // Handle backdrop click
  const handleBackdropClick = () => {
    if (closeOnBackdrop) onNo();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent backdrop close on modal click
        className={`bg-white rounded-xl shadow-xl w-full max-w-md p-8 text-center space-y-6 transform transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 id={titleId} className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        <p id={descId} className="text-gray-700 text-base">
          {message}
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            ref={yesBtnRef}
            type="button"
            onClick={onYes}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {yesText}
          </button>
          <button
            type="button"
            onClick={onNo}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {noText}
          </button>
        </div>
      </div>
    </div>
  );
}
