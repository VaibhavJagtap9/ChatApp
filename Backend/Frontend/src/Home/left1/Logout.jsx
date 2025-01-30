import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiHelpCircle } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const MenuItem = ({ icon, label }) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md duration-300">
      <span className="text-gray-700">{icon}</span>
      <span className="text-gray-800 text-sm font-medium">{label}</span>
    </div>
  );
};

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-[#f0f2f5] mr-1  p-4">
      {/* Menu Options */}
      <div className="flex flex-col space-y-6 items-start text-black  ">
        
        <div className="hover:bg-green-500 hover:text-white">
        <MenuItem
          icon={<AiOutlineUser className="text-2xl" 
          />}
        />
        </div>

        <div className="hover:bg-green-500 hover:text-white">
        <MenuItem
          icon={<IoMdNotificationsOutline className="text-2xl" />}
        />
        </div>

        <div className="hover:bg-green-500 hover:text-white">
        <MenuItem
          icon={<AiOutlineSetting className="text-2xl" />}
        />
        </div>

        <div className="hover:bg-green-500 hover:text-white">
        <MenuItem
          icon={<FiHelpCircle className="text-2xl" />}
        />
        </div>

      </div>

      {/* Logout Button */}
      <div className="flex justify-center">
        <button onClick={handleLogout} disabled={loading}>
          <TbLogout2
            className={`text-5xl ${
              loading ? "text-gray-400" : "text-[#080202]"
            } p-2 hover:bg-green-500 hover:text-white rounded-lg duration-300`}
          />
        </button>
      </div>
    </div>
  );
}

export default Logout;
