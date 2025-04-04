import React from "react";

function    Inputs({
  children,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
}) {
  return (
    <div className="relative w-80  m-auto mb-6  max-sm:w-[90%]">
      <input
        className="peer border-b border-gray-300 outline-none w-full text-gray-700 bg-transparent focus:ring-0 focus:border-blue-500"
        type={
          children === "Password"
            ? "password"
            : children === "Email"
            ? "email"   
            : "text"
        }
        required
        value={email || password || name}
        onChange={(e) => {
          if (children === "Password") {
            setPassword(e.target.value);
          } else if (children === "Email") {
            setEmail(e.target.value);
          } else if (children === "Username") {
            setName(e.target.value);
          }
        }}
      />
      <label
        className={`absolute left-0 top-2 -translate-y-1/2 text-sm -mt-3  transition-all ${
          email || password || name
            ? "top-2 text-xs text-blue-500"
            : "top-6 text-base text-gray-400"
        }`}
      >
        {children}
      </label>
    </div>
  );
}

export default Inputs;
