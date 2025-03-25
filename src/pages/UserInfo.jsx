import React, { useState, useEffect } from "react";
import { avatar, nonProfile } from "../data";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { div } from "motion/react-client";
import AccountInputs from "../components/AccountInputs";

const BasicInfo = () => {
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(avatar);
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);
  const [isopen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
    }
  };

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setActiveButton(location.pathname);
  }, [location.pathname, isopen]);

  return (
    <>
      <NavBar />

      <div className="p-6 bg-gray-100 min-h-screen max-sm:p-4">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-10 max-sm:grid-cols-1">
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
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 flex ">
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

          <div className="">
            <div className="max-sm:flex gap-4">
              <h2 className="text-2xl font-bold mb-4">Basic Info</h2>
            </div>
            <AccountInputs />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
