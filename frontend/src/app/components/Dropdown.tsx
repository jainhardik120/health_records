import React from 'react';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options, label, className }) => {
  return (
    <label className={`mb-4 ${className}`}>
      {label}:
      <select
        className="border rounded px-2 py-1 ml-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
