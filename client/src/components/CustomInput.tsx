import React from "react";

interface Props {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string | number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  styleClass?: string;
  required?: boolean;
}

const CustomInput: React.FC<Props> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  styleClass,
  handleChange,
  required,
}) => {
  let hasError = error !== "";

  return (
    <div
      className={`custom-input ${styleClass} ${
        hasError && "custom-input--error"
      }`}
    >
      <label className="custom-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        required={required}
        onChange={handleChange}
        value={value}
        type={type}
        name={name}
        id={id}
        className="custom-input__input"
      />
      {hasError && <h4 className="custom-input__error">{error}</h4>}
    </div>
  );
};

export default CustomInput;
