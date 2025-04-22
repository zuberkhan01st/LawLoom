import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-xl font-semibold shadow transition duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};
