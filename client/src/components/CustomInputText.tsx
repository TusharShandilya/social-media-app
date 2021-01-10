import React from "react";

interface Props {
  id: string;
  label: string;
  type: "text" | "password" | "email";
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  styleClass?: string;
  required?: boolean;
  autoFocus?: boolean;
}

const CustomInputText: React.FC<Props> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  styleClass,
  handleChange,
  required,
  autoFocus,
}) => {
  return (
    <div
      className={`input-text ${styleClass} ${
        error?.length ? "input-text--error" : ""
      }`}
    >
      <input
        autoFocus={autoFocus}
        required={required}
        onChange={handleChange}
        value={value}
        type={type}
        name={name}
        id={id}
        className="input-text__input"
      />
      <label
        className={`input-text__label ${
          value.length ? "input-text__label--active" : ""
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      {error?.length ? <h4 className="input-text__error">{error}</h4> : ""}
    </div>
  );
};

export default CustomInputText;
