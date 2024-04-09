import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children : ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button className={`bg-black hover:bg-gray-800 text-white py-2 px-4 rounded ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
