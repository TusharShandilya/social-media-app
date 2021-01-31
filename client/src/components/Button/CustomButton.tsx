import React from "react";

interface Props {
  styleClass?: string;
  ariaLabel?: string;
  type?: "submit";
  noBackground?: boolean;
  variant?: "primary" | "secondary" | "info" | "danger" | "warning" | "success";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomButton: React.FC<Props> = ({
  ariaLabel,
  variant = "primary",
  type,
  noBackground,
  onClick,
  children,
  styleClass,
}) => {
  return (
    <div
      className={`btn-background ${styleClass} ${
        noBackground ? "btn-background--inactive" : ""
      }`}
    >
      <button
        aria-label={ariaLabel}
        tabIndex={0}
        onClick={onClick}
        type={type}
        className={`btn btn-${variant}`}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
