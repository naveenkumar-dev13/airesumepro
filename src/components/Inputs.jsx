import React from "react";

function Inputs({ children, email, setEmail }) {
  return (
    <div className="relative w-80  m-auto mb-6 max-md:w-60">
      <input
        className="peer border-b border-gray-300 outline-none w-full text-gray-700 bg-transparent focus:ring-0 focus:border-blue-500"
        type={children === "Password" ? "password" : "text"}
        // placeholder={children}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="absolute left-0 top-6 -translate-y-1/2 text-sm  -mt-3 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
        {children}
      </label>
    </div>
  );
}

export default Inputs;
