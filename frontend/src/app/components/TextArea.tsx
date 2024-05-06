import React from 'react';

interface TextAreaProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  list? : string
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, value, onChange, list }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};


export default TextArea;
