import React from "react";

const InfoBlock = ({ title, description }) => {
  return (
    <div className="p-4 text-center border-t border-gray-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default InfoBlock;
