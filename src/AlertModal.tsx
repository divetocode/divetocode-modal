"use client";

import { useEffect, useState } from "react";
import ConfirmButton from "./_Conponents/ConfirmButton";

type AlertModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;

  confirmText?: string;
  alarmText?: string;
};

export default function AlertModal({ isOpen, message, onClose, confirmText, alarmText  }: AlertModalProps) {
  const [show, setShow] = useState(false);

  // 트랜지션용 상태 제어
  useEffect(() => {
    let timer;
    if (isOpen) {
      setShow(true);
    } else {
      timer = setTimeout(() => setShow(false), 300); // 트랜지션 후 제거
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-xl w-full max-w-md p-8 text-center space-y-6 transform transition-all duration-300
        ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <h2 className="text-xl font-bold text-gray-800">❗ {alarmText || "Alarm"}</h2>
        <p className="text-gray-700 text-base">{message}</p>

        <ConfirmButton onClick={onClose}>
          {confirmText || "Confirm"}
        </ConfirmButton>
      </div>
    </div>
  );
}
