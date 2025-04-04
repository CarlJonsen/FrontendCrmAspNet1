import React from "react";

interface Props {
  label: string;
  name: string;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const FormTextarea = ({ label, name, rows = 3, value, onChange, error }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <textarea
        id={name}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        rows={rows}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormTextarea;