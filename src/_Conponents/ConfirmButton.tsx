"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ConfirmButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  const baseStyles =
    "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      {...props}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
}
