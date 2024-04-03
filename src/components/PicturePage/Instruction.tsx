import React, { ReactNode } from "react";

const Instruction: React.FC<{
  stepName: string;
  children: ReactNode;
}> = ({ stepName, children }) => {
  return (
    <div className="relative bg-white h-1/2 md:h-full w-full md:w-1/3 rounded-2xl border-4 border-blue-500 drop-shadow-lg">
      <h3 className="text-xl font-bold">{stepName}</h3>
      <div className="flex flex-col flex-wrap justify-center items-center h-full pb-4">
        {children}
      </div>
    </div>
  );
};

export default Instruction;
