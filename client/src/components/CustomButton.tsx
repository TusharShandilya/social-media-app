import React from "react";

interface Props {
  styleClass?: string;
  ariaLabel?: string;
  type?: "submit";
  noBackground?: boolean;
  color?: "success" | "danger" | "primary";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomButton: React.FC<Props> = ({
  ariaLabel,
  color,
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
        className={`btn btn-${color ? color : "basic"}`}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
