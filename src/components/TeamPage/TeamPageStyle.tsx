import React from "react";

export const TeamTitle: React.FC<{ children }> = ({ children }) => {
  return (
    <h2 className="text-xl font-bold px-5 py-2 my-2 text-white w-full bg-blue-800 shadow-lg">
      {children}
    </h2>
  );
};