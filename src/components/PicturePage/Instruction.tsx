import React from "react";

const Instruction: React.FC<{ stepName: string }> = ({
  stepName,
  children,
}) => {
  return (
    <div className="relative bg-white h-full w-1/2 rounded-2xl border-8 border-blue-500 drop-shadow-lg">
      <h3 className="text-xl font-bold">{stepName}</h3>
      {children}
    </div>
  );
};

export default Instruction;
