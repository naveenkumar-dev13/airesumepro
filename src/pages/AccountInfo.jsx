import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import ShowPasswordPopup from "../components/ShowPasswordPopup";
import { avatar, nonProfile } from "../data";
import Loading from "../components/Loading";

function AccountInfoPage() {
  const [info, setInfo] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [activeButton, setActiveButton] = useState("basicinfo");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchAccountInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/account-info",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      const userData = data.user;
      if (userData && userData._id) {
        delete userData._id;
      }
      setInfo({ ...userData, password: "********" });
    } catch (err) {
      console.error("Error fetching account info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(info[field] || "");
    if (field === "password") {
      setShowPasswordPopup(true);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedInfo = { ...info, [editingField]: tempValue };

    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/update-account-info",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ [editingField]: tempValue }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setInfo(updatedInfo);
        setEditingField(null);
        setTempValue("");
        setLoading(false);
      } else {
        console.error("Update failed:", data);
      }
    } catch (err) {
      console.error("Error updating info:", err);
    }
  };

  const confirmPasswordSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://airesumeproapi.onrender.com/api/update-account-info",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ newPassword: tempValue }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setInfo((prev) => ({ ...prev, password: "********" }));
        setEditingField(null);
        setShowPasswordPopup(false);
        setTempValue("");
      } else {
        console.error("Password update failed:", data);
      }
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen">
      <NavBar />
      <div className="p-6">
        <div
          className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-10 max-sm:grid-cols-1 max-sm:p-2 max-sm:gap-2"
          style={{ boxShadow: "0px 0px 45px rgba(0, 0, 0, 0.2)" }}
        >
          {/* Sidebar */}
          <div className="p-4 border-r-2 border-[#1170CD] flex-1 flex gap-4 flex-col relative max-md:border-none">
            <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-28">
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
                    <img
                      src={nonProfile}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
              </label>
            </div>
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 max-sm:hidden">
              <Link to={"/userinfo"}>
                <Button
                  className={`py-2 mb-4 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "basicinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => setActiveButton("basicinfo")}
                >
                  <ion-icon name="person-outline" className="w-5 h-5 mt-1" />
                  Basic Info
                </Button>
              </Link>
              <Link to={"/accountinfo"}>
                <Button
                  className={`w-40 py-2 font-medium hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "/accountinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => setActiveButton("/accountinfo")}
                >
                  <ion-icon name="settings-outline" className="w-5 h-5 mt-1" />
                  Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-2 mt-6">
            <div className="max-sm:flex max-sm:items-center max-sm:gap-4">
              <div className="hidden max-sm:block">
                {!isOpen && (
                  <FontAwesomeIcon
                    icon={faBars}
                    className="w-6 h-6 text-[#1170CD]"
                    onClick={() => setIsOpen(true)}
                  />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-4 max-sm:text-center max-sm:my-5">
                Account Info
              </h2>
            </div>

            <form onSubmit={handleSave}>
              {Object.keys(info).map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-6 text-start py-6 max-sm:py-4 border-b max-sm:flex-col max-sm:gap-4"
                >
                  <div className="flex justify-between max-sm:w-full">
                    <p className="capitalize font-medium text-xl">{key}:</p>
                    <div className="mt-2 hidden max-sm:block">
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
                  </div>

                  {editingField === key && key !== "password" ? (
                    <div>
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="px-2 py-1 flex-1 border-b"
                      />
                      <div className="flex justify-start mt-4 gap-2">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="p-2 bg-gray-300 rounded-md"
                        >
                          Cancel
                        </button>
                        <Button type="submit" className="!p-2">
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-950 font-semibold flex-grow max-sm:w-full">
                      {key === "password" ? "********" : info[key]}
                    </p>
                  )}

                  {key !== "password" && (
                    <div className="max-sm:hidden">
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
                  )}
                  {key === "password" && (
                    <>
                      {editingField !== "password" ? (
                        <button
                          type="button"
                          onClick={() => handleEdit("password")}
                          className="!text-blue-500 !hover:underline !bg-white"
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex flex-col items-start gap-2">
                          <input
                            type="password"
                            placeholder="Enter new password"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="px-2 py-1 border-none rounded-md outline-none"
                          />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              onClick={confirmPasswordSave}
                              className="!p-2"
                            >
                              Save
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                setEditingField(null);
                                setTempValue("");
                              }}
                              className="!p-2 bg-gray-300"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </form>

            <div className="flex justify-between items-center gap-4 max-sm:flex-col max-sm:gap-4">
              <Button className="px-3 py-2 font-medium rounded-md bg-white hover:!bg-[#F01F1F] hover:!text-white !text-[#F01F1F] border-2 border-[#F01F1F] flex gap-2 justify-center items-center max-sm:w-full">
                <ion-icon name="trash-outline" className="w-5 h-5" />
                Delete
              </Button>
              <Button className="px-6 py-2 font-medium rounded-md bg-[#1170CD] !text-white border-2 border-[#1170CD] flex gap-2 items-center justify-center max-sm:w-full">
                <ion-icon name="log-out-outline" className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>

          {isOpen && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute top-52 left-[26px] h-[400px] bg-white shadow-2xl p-4 w-[320px] rounded-md"
            >
              <div className="flex justify-between">
                <div className="p-2 flex flex-col gap-6 w-[250px] absolute top-12 left-5">
                  <Link to={"/userinfo"}>
                    <Button
                      className={`w-40 py-2 ${
                        activeButton === "/userinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                    >
                      <ion-icon name="person-outline" className="w-5 h-5" />
                      Basic Info
                    </Button>
                  </Link>
                  <Link to={"/accountinfo"}>
                    <Button
                      className={`w-40 py-2 ${
                        activeButton === "/accountinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                    >
                      <ion-icon name="settings-outline" className="w-5 h-5" />
                      Account
                    </Button>
                  </Link>
                </div>
                <span onClick={() => setIsOpen(false)}>
                  <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Password popup */}
      <ShowPasswordPopup
        setTempValue={setTempValue}
        setShowPasswordPopup={setShowPasswordPopup}
        showPasswordPopup={showPasswordPopup}
        confirmPasswordSave={confirmPasswordSave}
      />
    </div>
  );
}

export default AccountInfoPage;
