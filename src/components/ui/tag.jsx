import React from 'react';

const Tag = ({ children, className, ...props }) => {
  return (
    <span
      className={`bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Tag;
