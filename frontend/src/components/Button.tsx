import React from "react";

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
}

function Button({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
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
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
