import React, { useState, useEffect } from "react";
import { avatar, nonProfile } from "../data";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountInputs from "../components/AccountInputs";
import { motion } from "framer-motion";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BasicInfo = () => {
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(avatar);
  const location = useLocation();
  const [isopen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(location.pathname);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    gender: "",
    location: "",
    birthday: "",
    summary: "",
    githubLink: "",
    linkedinLink: "",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(user[field]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, [editingField]: tempValue });
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBasicInfo();
    setActiveButton(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isopen]);

  const fetchBasicInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://airesumeproapi.onrender.com/api/basic-info",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching basic info:", error);
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://airesumeproapi.onrender.com/api/basic-info",
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Basic info updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating basic info:", error);
      setMessage("Failed to update basic info.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="h-screen">
      <NavBar />
      <div className="max-sm:p-4 h-[calc(100vh-75px)]">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-14 max-sm:grid-cols-1">
          {/* Sidebar */}
          <div className="p-4 border-r-2 border-[#1170CD] flex gap-4 flex-col relative max-md:border-none">
            <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-24">
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
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 max-sm:hidden">
              <Link to={"/userinfo"}>
                <Button
                  className={`py-2 mb-4 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "/userinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => setActiveButton("userinfo")}
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
          <div>
            <div className="max-sm:flex gap-4">
              <div className="hidden max-sm:block">
                {!isopen && (
                  <FontAwesomeIcon
                    icon={faBars}
                    className="w-10 h-10 block max-sm:w-6 max-sm:h-6 text-[#1170CD]"
                    onClick={() => setIsOpen(true)}
                  />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-4">Basic Info</h2>
            </div>

            {message && (
              <div
                className={`mb-4 p-2 rounded-md ${
                  message.includes("success")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {Object.keys(user)
                .filter((key) => !["profilePicture"].includes(key))
                .map((key) => (
                  <div
                    key={key}
                    className="flex items-start py-6 border-b max-sm:gap-2 max-sm:flex-col gap-4"
                  >
                    {/* Field label */}
                    <div className="w-1/4 min-w-[120px] max-sm:w-full max-sm:flex max-sm:justify-between">
                      <p className="capitalize font-medium text-xl">{key}:</p>
                      <div className="mt-2 sm:mt-0 hidden max-sm:block">
                        {key !== "username" && (
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

                    {/* Field content - aligned to same starting point */}
                    <div className="flex-1 w-full">
                      {editingField === key ? (
                        <>
                          {key === "birthday" ? (
                            <div className="w-full">
                              <input
                                type="date"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="w-full px-2 py-1 border rounded-md"
                              />
                            </div>
                          ) : key === "summary" ? (
                            <textarea
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="w-full px-2 py-1 border rounded-md h-40"
                              rows={4}
                            />
                          ) : key === "gender" ? (
                            <select
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="w-full px-2 py-1 border rounded-md"
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="w-full px-2 py-1 border rounded-md"
                            />
                          )}
                          <div className="flex justify-start mt-4">
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="p-2 border rounded-md mr-2"
                            >
                              Cancel
                            </button>
                            <Button type="submit" className="!p-2">
                              Save
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-950">
                          {key === "birthday"
                            ? new Date(user[key]).toLocaleDateString()
                            : user[key] || "-"}
                        </p>
                      )}
                    </div>

                    {/* Edit button (desktop) */}
                    <div className="w-20 text-right max-sm:hidden">
                      {key !== "username" && (
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
                ))}
            </form>
          </div>

          {/* Mobile Menu */}
          {isopen && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute top-52 left-5 h-[400px] bg-white shadow-2xl p-4 w-[350px] rounded-md"
            >
              <div className="flex justify-between">
                <div className="p-2 flex flex-col gap-6 w-[250px] absolute top-12 left-5">
                  <Link to={"/userinfo"}>
                    <Button
                      className={`py-2 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                        activeButton === "/userinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/userinfo");
                        setIsOpen(false);
                      }}
                    >
                      <span className="block mt-1">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
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
                      onClick={() => {
                        setActiveButton("/accountinfo");
                        setIsOpen(false);
                      }}
                    >
                      <span className="block mt-1">
                        <FontAwesomeIcon icon={faGear} />
                      </span>
                      Account
                    </Button>
                  </Link>
                </div>
                <div>
                  <span onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
