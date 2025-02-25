import React, { forwardRef } from "react";
import "./Checkbox.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, name, className }, ref) => (
    <label className={`${className} checkbox`}>
      <input
        className="checkbox-input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        ref={ref}
      />
      <span className="checkbox-control"></span>
      <span className="checkbox-label">{label}</span>
    </label>
  )
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
