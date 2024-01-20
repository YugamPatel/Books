import React from "react";

const Spinners = () => {
  return (
    <div className="">
      <div className ="w-8 h-8 bg-blue-900 absolute left-1/2 top-1/2 rounded-full animate-ping"></div>
      <div className ="w-8 h-8 bg-green-700 absolute left-1/2 top-1/2 rounded-full animate-ping"></div>
      <div className ="w-8 h-8 bg-red-400 absolute left-1/2 top-1/2 rounded-full animate-pulse"></div>
    </div>
  );
};

export default Spinners;
