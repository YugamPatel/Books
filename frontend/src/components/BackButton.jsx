import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/", color = "sky" }) => {
  // Map color prop to Tailwind CSS classes
  const colorClassMap = {
    sky: "bg-sky-600",
    red: "bg-red-400",
    blue: "bg-blue-600",
    green: "bg-green-600",
  };

  // Get the appropriate class for the current color prop
  const backgroundColorClass = colorClassMap[color] || colorClassMap.sky;

  return (
    <div className="flex">
      <Link to={destination} className={`${backgroundColorClass} text-white px-2 py-2 rounded-full`}>
        <BsArrowLeft className="w-8 h-8 text-blue-900"></BsArrowLeft>
      </Link>
    </div>
  );
};

export default BackButton;
