import React, { useState } from "react";
import { userInfo } from "../data";

import Button from "../components/Button";

function AccountInputs() {
  const [info, setInfo] = useState(userInfo);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(info[field]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedInfo = { ...info, [editingField]: tempValue };
    setInfo(updatedInfo);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        {Object.keys(info).map((key) => (
          <div
            key={key}
            className="flex items-center py-6 border-b  max-sm:gap-2 max-sm:flex-col gap-4 "
          >
            <div>
              <p className="capitalize font-medium  max-sm:text-xl ">{key}:</p>
            </div>
            {editingField === key ? (
              key === "summary" ? (
                <>
                  <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="border px-2 py-1 rounded-md h-40 w-full"
                    rows={4}
                  />
                  {editingField && (
                    <div className="flex justify-start mt-4">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="p-2 border  rounded-md mr-2"
                      >
                        Cancel
                      </button>
                      <Button type="submit" className={"!p-2"}>
                        Save
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="px-2 py-1  flex-1 border-b"
                  />
                  {editingField && (
                    <div className="flex justify-start mt-4">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-2  border rounded-md mr-2"
                      >
                        Cancel
                      </button>
                      <Button type="submit" className={"!p-2"}>
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              )
            ) : (
              <p className="text-gray-950 font-semibold flex-1 max-sm:text-sm">
                {info[key]}
              </p>
            )}
            <button
              type="button"
              onClick={() =>
                editingField === key ? handleSave() : handleEdit(key)
              }
              className="text-blue-500 hover:underline"
            >
              {editingField === key ? "" : "Edit"}
            </button>
          </div>
        ))}
      </form>
    </div>
  );
}

export default AccountInputs;
