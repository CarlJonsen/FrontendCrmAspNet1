import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
}

const FormSelect = ({ label, name, value, onChange, options, placeholder = "Select...", error }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormSelect;