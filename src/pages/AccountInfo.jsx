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
import SideBar from "../components/SideBar";
import axios from "axios";

function AccountInfoPage() {
  // State variables
  const [info, setInfo] = useState({}); // Stores account information
  const [editingField, setEditingField] = useState(null); // Tracks the field being edited
  const [tempValue, setTempValue] = useState(""); // Temporary value for editing
  const [userAvatar, setUserAvatar] = useState(avatar); // Stores the user's profile picture
  const [activeButton, setActiveButton] = useState("basicinfo"); // Tracks the active sidebar button
  const [showPasswordPopup, setShowPasswordPopup] = useState(false); // Controls the password popup visibility
  const [isOpen, setIsOpen] = useState(false); // Controls the mobile menu visibility
  const [loading, setLoading] = useState(true); // Tracks the loading state
  const [message, setMessage] = useState(""); // Stores success or error messages

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch account information from the API
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

  // Fetch account info on component mount
  useEffect(() => {
    fetchAccountInfo();
  }, []);

  // Update the active button based on the current route
  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  // Handle editing a specific field
  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(info[field] || ""); 
    if (field === "password") {
      setShowPasswordPopup(true); 
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  // Save the updated field to the API
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
        setInfo(updatedInfo); // Update the local state with the new value
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

  // Save the updated password
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

  // Handle profile picture upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", file);

        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://airesumeproapi.onrender.com/api/upload-profile-picture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUserAvatar(response.data.profilePicture); 
        setMessage("Profile picture updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setMessage(
          error.response?.data?.error || "Failed to update profile picture."
        );
      }
    }
  };

  // Profile picture component
  const Profile = () => (
    <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-24">
      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <label htmlFor="avatar-upload" className="cursor-pointer block">
        <div className="w-32 h-32 object-cover rounded-full mx-auto my-4">
          <img
            src={userAvatar}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.src = nonProfile; 
            }}
          />
        </div>
      </label>
    </div>
  );

  if (loading) {
    return <Loading />; 
  }

  return (
    <div className="h-screen">
      <NavBar />
    
      <div className="p-6 max-sm:p-4 h-[calc(100vh-75px)] mt-10">
        <div
          className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-10 max-sm:grid-cols-1 max-sm:p-2 max-sm:gap-2"
          style={{ boxShadow: "0px 0px 45px rgba(0, 0, 0, 0.2)" }}
        >
          <div className="p-4 border-r-2 border-[#1170CD] flex-1 flex gap-4 flex-col relative max-md:border-none">
            <Profile />
            <SideBar
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
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
                  className="flex items-center gap-6 text-start py-6 max-sm:py-4 border-b max-sm:flex-col max-sm:gap-4 max-sm:px-4"
                >
                  {/* Field label */}
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

                  {/* Field value or input */}
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

                  {/* Edit button for desktop */}
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

                  {/* Password field */}
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

            {/* Delete and Logout buttons */}
            <div className="flex justify-between items-center gap-4 max-sm:flex-col max-sm:gap-4">
              <Button className="px-3 py-2 font-medium rounded-md bg-white hover:!bg-[#F01F1F] hover:!text-white !text-[#F01F1F] border-2 border-[#F01F1F] flex gap-2 justify-center items-center max-sm:w-full">
                <ion-icon name="trash-outline" className="w-5 h-5" />
                Delete
              </Button>
              <Button
                className="px-6 py-2 font-medium rounded-md bg-[#1170CD] !text-white border-2 border-[#1170CD] flex gap-2 items-center justify-center max-sm:w-full"
                onClick={handleLogout}
              >
                <ion-icon name="log-out-outline" className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute top-56 left-4 h-[400px] bg-white shadow-2xl p-4 w-[320px] rounded-md"
            >
              <div className="flex justify-between">
                <div className="p-2 flex flex-col  w-[250px] absolute top-12 left-5 ">
                  <Link to={"/userinfo"}>
                    <Button
                      className={`py-2 mb-4 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                        activeButton === "/userinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                      onClick={() => setActiveButton("/userinfo")}
                    >
                      <ion-icon name="person-outline" className="w-5 h-5" />
                      <p> Basic Info</p>
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
                      <ion-icon name="settings-outline" className="w-5 h-5 " />
                      <p> Account</p>
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
