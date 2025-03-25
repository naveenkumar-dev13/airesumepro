import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AccountInfo, avatar, nonProfile } from "../data";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PasswordPopUP from "../components/PasswordPopUp";

function AccountInfoPage() {
  const [info, setInfo] = useState(AccountInfo);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [activeButton, setActiveButton] = useState("basicinfo");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <NavBar />
      <div className="p-6 bg-gray-100 h-screen m-auto">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-10 max-sm:grid-cols-1 max-sm:p-2 max-sm:gap-2">
          <div className="p-4 border-r-2 border-[#1170CD] flex-1 flex gap-4 flex-col relative max-md:border-none">
            <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-20">
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
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 flex">
              <Link
                to="/userinfo"
                className={`px-6 py-2 font-medium hover:bg-[#1170CD] hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                  activeButton === "userinfo" ? "" : ""
                }`}
                onClick={() => {
                  setActiveButton("userinfo");
                }}
              >
                <span className="block mt-1">
                  <ion-icon
                    name="person-outline"
                    className="w-5 h-5"
                  ></ion-icon>
                </span>
                Basic Info
              </Link>

              <Button
                to="/accountinfo"
                className={`w-40 py-2 font-medium hover:bg-[#1170CD] hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                  activeButton === "account" ? "" : ""
                }`}
                onClick={() => {
                  setActiveButton("account");
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

          <div className="space-y-2">
            <h2 className="text-2xl font-bold mb-4 max-sm:text-center">
              Account Info
            </h2>
            <form onSubmit={handleSave}>
              {Object.keys(info).map((key) => (
                <div
                  key={key}
                  className="flex items-center py-6 border-b max-sm:flex-col max-sm:gap-4"
                >
                  <p className="capitalize font-medium w-52">{key}:</p>
                  {editingField === key ? (
                    <div>
                      <input
                        type={key === "password" ? "text" : "text"}
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="px-2 py-1 flex-1 border-b"
                      />
                      {editingField === "password" ? (
                        <div className="flex justify-start mt-4">
                          <button
                            type="button"
                            onClick={() => setShowPasswordPopup(true)}
                            className="p-2 bg-gray-300 rounded-md mr-2"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="p-2 bg-gray-300 rounded-md"
                          >
                            Cancel
                          </button>
                          {/* <PasswordPopUP info={info} setInfo={setInfo} /> */}
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
                    <p className="text-gray-950 font-semibold flex-1">
                      {key === "password" ? "••••••••" : info[key]}
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
            <div className="flex justify-between items-center gap-4 max-sm:flex-col max-sm:gap-4">
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
        </div>
      </div>
    </div>
  );
}

export default AccountInfoPage;
