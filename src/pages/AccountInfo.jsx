import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AccountInfo, avatar, nonProfile } from "../data";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AccountInfoPage() {
  const [info, setInfo] = useState(AccountInfo);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [activeButton, setActiveButton] = useState("basicinfo");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isopen, setIsOpen] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
    }
  };

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

  const confirmPasswordSave = (e) => {
    e.preventDefault();
    const updatedInfo = { ...info, password: tempValue };
    setInfo(updatedInfo);
    setEditingField(null);
    setShowPasswordPopup(false);
  };
  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <NavBar />
      <div className="p-6">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-10 max-sm:grid-cols-1 max-sm:p-2 max-sm:gap-2">
          <div className="p-4 border-r-2 border-[#1170CD] flex-1 flex gap-4 flex-col relative max-md:border-none">
            <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-28 ">
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
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4  max-sm:hidden  ">
              <Link to={"/userinfo"}>
                <Button
                  className={`py-2  mb-4 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "basicinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveButton("basicinfo");
                  }}
                >
                  <span className="block mt-1">
                    <ion-icon
                      name="person-outline"
                      className="w-5 h-5"
                    ></ion-icon>
                  </span>
                  Basic Info
                </Button>
              </Link>
              <Button
                className={`w-40 py-2 font-medium hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                  activeButton === "account" ? "!bg-[#1170CD] !text-white" : ""
                }`}
                onClick={() => {
                  setActiveButton("account");
                  navigate("/accountinfo");
                }}
              >
                <span className="block mt-1">
                  <ion-icon
                    name="settings-outline"
                    className="w-5 h-5"
                  ></ion-icon>
                </span>
                Account
              </Button>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <div className="max-sm:flex max-sm:items-center max-sm:gap-4 ">
              <div className="max-sm:flex gap-4">
                <div className="hidden max-sm:block">
                  {!isopen ? (
                    <ion-icon
                      name="menu-outline"
                      className="w-10 h-10 block max-sm:w-8 max-sm:h-8 text-[#1170CD]"
                      onClick={() => setIsOpen(true)}
                    ></ion-icon>
                  ) : (
                    <ion-icon
                      name="close-outline"
                      className="w-10 h-10 block max-sm:w-8 max-sm:h-8 text-[#1170CD]"
                      onClick={() => setIsOpen(false)}
                    ></ion-icon>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 max-sm:text-center max-sm:my-5">
                  Account Info
                </h2>
              </div>
            </div>
            <form onSubmit={handleSave}>
              {Object.keys(info).map((key) => (
                <div
                  key={key}
                  className="flex items-center  gap-6 text-start py-6 max-sm:py-4 border-b max-sm:flex-col max-sm:gap-4"
                >
                  <div className="flex justify-between max-sm:w-full  ">
                    <p className="capitalize font-medium text-xl">{key}:</p>
                    <div className="mt-2 sm:mt-0 hidden max-sm:block">
                      {key !== "password" && (
                        <button
                          type="button"
                          onClick={() =>
                            editingField === key
                              ? handleSave()
                              : handleEdit(key)
                          }
                          className="text-blue-500 hover:underline"
                        >
                          {editingField === key ? "" : "Edit"}
                        </button>
                      )}
                    </div>
                  </div>
                  {editingField === key ? (
                    <div>
                      <input
                        type={key === "password" ? "text" : "text"}
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="px-2 py-1 flex-1 border-b"
                      />

                      {editingField === "password" ? (
                        <div className="flex justify-start mt-4 gap-2 ">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="p-2 bg-gray-300 rounded-md"
                          >
                            Cancel
                          </button>
                          <Button
                            type="button"
                            onClick={() => setShowPasswordPopup(true)}
                            className="!p-2 "
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-start mt-4">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="p-2 bg-gray-300 rounded-md mr-2"
                          >
                            Cancel
                          </button>
                          <Button type="submit" className={"!p-2"}>
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-950 font-semibold flex-grow max-sm:w-full ">
                      {info[key]}
                    </p>
                  )}
                  <div>
                    {key === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPasswordPopup(true)}
                        className="text-blue-500 hover:underline"
                      >
                        Change Password
                      </button>
                    )}
                  </div>
                  <div className="max-sm:hidden">
                    {key !== "password" && (
                      <button
                        type="button"
                        onClick={() =>
                          editingField === key ? handleSave() : handleEdit(key)
                        }
                        className="text-blue-500 hover:underline"
                      >
                        {editingField === key ? "" : "Edit"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </form>
            <div className="flex justify-between items-center gap-4 max-sm:flex-col max-sm:gap-4 max-sm:!my-5 ">
              <Button className="px-3 py-2 font-medium rounded-md hover:!text-white hover:!bg-[#F01F1F] bg-white !text-[#F01F1F] border-2 border-[#F01F1F] !flex gap-2 justify-center items-center max-sm:w-full">
                <ion-icon name="trash-outline" className="w-5 h-5"></ion-icon>
                Delete
              </Button>
              <Button className="px-6 py-2 font-medium rounded-md hover:!text-white bg-[#1170CD] !text-white border-2 border-[#1170CD] !flex gap-2 items-center justify-center max-sm:w-full">
                <span className="block mt-1">
                  <ion-icon
                    name="log-out-outline"
                    className="w-5 h-5"
                  ></ion-icon>
                </span>
                Logout
              </Button>
            </div>
          </div>
          {isopen && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute top-52 left-7  h-[400px]  bg-white shadow-2xl p-4 w-[330px] rounded-md  "
            >
              <div className="flex justify-between ">
                <div className=" p-2 flex  flex-col gap-6  absolute top-12 left-5 ">
                  <Link to={"/userinfo"}>
                    <Button
                      className={`py-2 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                        activeButton === "basicinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("basicinfo");
                      }}
                    >
                      <span className="block mt-1">
                        <ion-icon
                          name="person-outline"
                          className="w-5 h-5"
                        ></ion-icon>
                      </span>
                      Basic Info
                    </Button>
                  </Link>
                  <Button
                    className={`w-40 py-2 font-medium hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                      activeButton === "account"
                        ? "!bg-[#1170CD] !text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveButton("account");
                      navigate("/accountinfo");
                    }}
                  >
                    <span className="block mt-1">
                      <ion-icon
                        name="settings-outline"
                        className="w-5 h-5"
                      ></ion-icon>
                    </span>
                    Account
                  </Button>
                </div>
                <div>
                  <span onClick={() => setIsOpen(false)}>
                    <ion-icon
                      name="chevron-back-outline"
                      className="w-5 h-5"
                    ></ion-icon>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {showPasswordPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={confirmPasswordSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordPopup(false)}
                  className="p-2 border
                 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountInfoPage;
