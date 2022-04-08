import React, { useState } from "react";
import { FaSignal } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-screen h-[80px] z-10 bg-blue-200 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <div className="text-4xl m-2">
            <FaSignal />
          </div>
          <h1 className="text-2xl font-bold mr-4 sm:text-4xl uppercase">
            Bandwidth Calculator
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
