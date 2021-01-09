import React from "react";

interface Props {
  ariaLabel?: string;
  type?: "submit";
  noBackground?: boolean;
  color?: "primary" | "secondary" | "danger";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomButton: React.FC<Props> = ({
  ariaLabel,
  color,
  type,
  noBackground,
  onClick,
  children,
}) => {
  return (
    <div
      className={`btn-background ${
        noBackground ? "btn-background--inactive" : ""
      }`}
    >
      <button
        aria-label={ariaLabel}
        tabIndex={0}
        onClick={onClick}
        type={type}
        className={`btn btn-${color ? color : "basic"}`}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
