import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type : string;
  className?: string;
}

const Input: React.FC<TextInputProps> = ({ value, onChange, label, type, className }) => {
  return (
    <label className={`mb-4 ${className}`}>
      {label}:
      <input
        type={type}
        className="border rounded px-2 py-1 ml-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default Input;
