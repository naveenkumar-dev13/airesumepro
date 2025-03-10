// import React, { useState } from "react";

// function UserInfoPop() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [key, setKey] = useState("");
//   const [formData, setFormData] = useState({});
//   const [editingField, setEditingField] = useState(null);
//   const [tempValue, setTempValue] = useState("");

//   return (
//     <div>
//       {" "}
//       {isOpen === key && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">
//               Edit {key.charAt(0).toUpperCase() + key.slice(1)}
//             </h2>
//             {key === "gender" ? (
//               <select
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="border p-2 w-full mb-3"
//               >
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             ) : key === "summary" ? (
//               <textarea
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="border p-2 w-full mb-3"
//               />
//             ) : (
//               <input
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="border p-2 w-full mb-3"
//               />
//             )}

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setIsOpen(null)}
//                 className="bg-gray-300 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setIsOpen(null)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserInfoPop;
