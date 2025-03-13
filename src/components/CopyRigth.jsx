import React from "react";

function CopyRigth() {
  return (
    <div className="flex justify-between items-center bg-[#111827] p-4 text-white border-t-2 border-gray-100 border-opacity-50 max-sm:flex-col-reverse max-sm:gap-4  max-sm:p-0 max-sm:border-hidden">
      <div className="text-xl max-sm:border-t-2 max-sm:border-gray-100 max-sm:border-opacity-50 max-sm:p-4 max-sm:text-center max-sm:text-sm w-full">
        <p>&copy; {new Date().getFullYear()}MindFulAI. All Rights Reserved.</p>
      </div>
      <div className="flex flex-col gap-2 items-start justify-start max-sm:gap-2 P-8 max-sm:p-4">
        <p className="text-2xl hidden max-sm:block">Follow us</p>
        <ul className="flex gap-6   max-sm:gap-2">
          <li>
            <ion-icon
              name="logo-instagram"
              className="text-2xl text-[#000] bg-[#9CA3AF] rounded-full p-2 max-sm:text-xl"
            ></ion-icon>
          </li>
          <li>
            <ion-icon
              name="logo-linkedin"
              className="text-2xl text-[#000] bg-[#9CA3AF] rounded-full p-2 max-sm:text-xl   "
            ></ion-icon>
          </li>
          <li>
            <ion-icon
              name="logo-facebook"
              className="text-2xl text-[#000] bg-[#9CA3AF] rounded-full p-2 max-sm:text-xl"
            ></ion-icon>
          </li>
          <li>
            <ion-icon
              name="logo-twitter"
              className="text-2xl text-[#000] bg-[#9CA3AF] rounded-full p-2 max-sm:text-xl"
            ></ion-icon>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CopyRigth;
