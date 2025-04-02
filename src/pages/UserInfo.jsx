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

const BasicInfo = () => {
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(avatar);
  const location = useLocation();
  const [isopen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(location.pathname);
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
    <div className="h-screen">
      <NavBar />
      <div className="max-sm:p-4  h-[calc(100vh-75px)]">
        <div className="max-w-6xl  mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-[200px_auto] gap-10 mt-14 max-sm:grid-cols-1    ">
          <div className="p-4 border-r-2 border-[#1170CD]  flex gap-4 flex-col relative max-md:border-none">
            <div className="absolute -top-20 left-15 max-sm:-top-20 max-sm:left-24 ">
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
            <div className="mt-20 max-md:flex max-md:justify-center max-md:items-center flex-col gap-4 flex max-sm:hidden ">
              <Link to={"/userinfo"}>
                <Button
                  className={`py-2 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                    activeButton === "/userinfo"
                      ? "!bg-[#1170CD] !text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveButton("/userinfo");
                  }}
                >
                  <span className=" mt-1">
                    <FontAwesomeIcon icon={faUser} className="!text-white" />
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
                  }}
                >
                  <span className="block mt-1 text-white">
                    <FontAwesomeIcon icon={faGear} />
                  </span>
                  Account
                </Button>
              </Link>
            </div>
          </div>

          <div className="  ">
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
            {<AccountInputs isopen={isopen} />}
          </div>
          {isopen && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute top-52 left-5  h-[400px]  bg-white shadow-2xl p-4 w-[350px] rounded-md  "
            >
              <div className="flex justify-between ">
                <div className=" p-2 flex  flex-col gap-6 w-[250px] absolute top-12 left-5 ">
                  <Link to={"/userinfo"}>
                    <Button
                      className={`py-2 w-40 font-medium rounded-md hover:!text-white bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                        activeButton === "/userinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/userinfo");
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
                  <Link to={"/accountinfo"}>
                    <Button
                      className={`w-40 py-2 font-medium hover:!text-white rounded-md bg-white !text-[#1170CD] border-2 border-[#1170CD] !flex gap-2 items-center ${
                        activeButton === "/accountinfo"
                          ? "!bg-[#1170CD] !text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/accountinfo");
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
