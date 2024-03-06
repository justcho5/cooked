import React from "react";

export interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: (data?: any) => void;
  radius: string;
  width: string;
  type: "submit" | "reset" | "button" | undefined;
}

export function Button({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  type,
}: Props) {
  return (
    <button
      className="flex items-center justify-center"
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
      type={type}
    >
      {children}
    </button>
  );
}
