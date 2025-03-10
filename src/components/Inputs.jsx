import React from 'react'

function Inputs({children,email,setEmail}) {
  return (
    <div className="relative w-80  m-auto mb-2 max-md:w-60">
    <input
      id="email"
      className="peer border-b border-gray-300 outline-none w-full py-2 text-gray-700 bg-transparent focus:ring-0 focus:border-blue-500"
      type="email"
      placeholder=""
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <label className="absolute left-0 top-2 -translate-y-1/2 text-sm  text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
      {children}
    </label>
  </div>
  )
}

export default Inputs
