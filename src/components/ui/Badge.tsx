import * as React from "react";
import clsx from "clsx";

interface BadgeProps {
  color: 'orange' | 'blue' | 'green' | 'red' | 'gray';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ color, children }) => {
  const colorClasses = {
    orange: "bg-orange-500 text-white",
    blue: "bg-blue-500 text-white",
    green: "bg-[#20C198] text-white",
    red: " bg-red-500 text-white",
    gray: "bg-[#495057] text-white"
  };

  return (
    <div className={clsx("px-3 py-1 rounded-[8px] text-sm font-medium", colorClasses[color])}>
      {children}
    </div>
  );
};

export default Badge;
