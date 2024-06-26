import React, { ReactNode } from "react";

export const TeamTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h2 className="text-xl font-bold px-5 py-2  text-white w-full bg-blue-800 shadow-lg  dark:bg-slate-800">
      {children}
    </h2>
  );
};
