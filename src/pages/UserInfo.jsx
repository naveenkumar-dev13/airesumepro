import React, { useState, useEffect } from "react";
import { avatar, nonProfile, userInfo } from "../data";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import UserInfoPop from "../components/UserInfoPop";

const BasicInfo = () => {
  const [info, setInfo] = useState(userInfo);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
    }
  };
  //   useEffect(() => {
  //     fetch("https://api.example.com/user/123")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setInfo(data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //         setLoading(false);
  //       });
  //   }, []);

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(info[field]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedInfo = { ...info, [editingField]: tempValue };
    setInfo(updatedInfo);
    setEditingField(null);
    //     fetch("https://api.example.com/user/123", {
    //       method: "PUT",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(updatedInfo),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setInfo(data);
    //         setEditingField(null);
    //       })
    //       .catch((error) => console.error("Error updating user data:", error));
  };

//   if (loading) return <Loading />;

  return (
    <>
      <NavBar />

      <div className="p-6 bg-gray-100 min-h-screen  ">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md  grid grid-cols-[200px_auto] gap-10 mt-10 max-sm:grid-cols-1">
          <div className="  p-4 border-r-2 border-[#1170CD]  flex-1 flex gap-4 flex-col relative max-md:border-none ">
            <div className="absolute -top-20 left-15  max-sm:-top-20 max-sm:left-20 ">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="avatar-upload" className="cursor-pointer block">
                <div className="w-32 h-32 object-cover rounded-full mx-auto my-4">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={nonProfile}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
            <div className="mt-20  max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 flex">
              <Button className="px-6 py-2 text-blue-600 font-medium rounded-md !flex gap-2 items-center ">
                <span className="block mt-1">
                  <ion-icon
                    name="person-outline"
                    className="w-5 h-5"
                  ></ion-icon>
                </span>
                Basic Info
              </Button>
              <Button className="px-6 py-2  font-medium hover:!text-white rounded-md !bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center">
                <span className="block mt-1">
                  <ion-icon
                    name="settings-outline"
                    className="w-5 h-5"
                  ></ion-icon>
                </span>{" "}
                Account
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Basic Info</h2>
            {Object.keys(info).map((key) => (
              <div
                key={key}
                className="flex justify-between items-center  gap-4 border-b-2 border-gray-200 p-4"
              >
                <h1 className="font-semibold capitalize ">
                  {key.replace("_", " ")}
                </h1>
                {editingField === key ? (
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="border px-2 py-1 rounded-md  flex-1 "
                  />
                ) : (
                  <p className="text-gray-950 font-semibold flex-1">
                    {info[key]}
                  </p>
                )}
                <button
                  onClick={() =>
                    editingField === key ? handleSave() : handleEdit(key)
                  }
                  className="text-blue-500 hover:underline"
                >
                  {editingField === key ? "Save" : "Edit"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {editingField && (
        <form className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onSubmit={handleSave}
          >
            <h2 className="text-xl font-bold mb-4">Edit {editingField}</h2>
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default BasicInfo;
