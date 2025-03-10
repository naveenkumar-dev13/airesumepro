import React from "react";

function Button({ children, className, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${className}  !bg-[#1170CD] text-white p-2 w-40 rounded-full cursor-pointer hover:!bg-[#0E5BAA] transition-all duration-300  `}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
