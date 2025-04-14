import React from "react";

interface Props {
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const FormStatusSelect = ({ name, value, onChange, error }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">Project Status</label>
      <select
        id={name}
        name={name}
        className={`form-select ${error ? "is-invalid" : ""}`}
        value={String(value)} // dropdown kräver sträng
        onChange={onChange}
      >
        <option value="false">In Progress</option>
        <option value="true">Completed</option>
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormStatusSelect;