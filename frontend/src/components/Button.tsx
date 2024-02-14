import React from "react";

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: (data?: any) => void;
  radius: string;
  width: string;
  type: "submit" | "reset" | "button" | undefined;
}

function Button({
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

export default Button;
