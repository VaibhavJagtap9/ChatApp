import React from "react";
import { IoCall, IoVideocam, IoEllipsisHorizontal } from "react-icons/io5"; // Importing icons
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // Function to get online status
  const getOnlineUserStatus = (conversation) => {
    if (!conversation || !conversation._id) return "Offline";
    return onlineUsers.includes(conversation._id) ? "Online" : "Offline";
  };

  return (
    <div
      className="sticky top-0 z-10 flex items-center space-x-4 bg-white hover:bg-gray-100 duration-300"
      style={{
        minHeight: "70px",
        padding: "10px 15px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <div
          className={`avatar ${
            getOnlineUserStatus(selectedConversation) === "Online"
              ? "online"
              : "offline"
          }`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={
                selectedConversation?.avatar ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* User Details Section */}
      <div className="flex-grow">
        <h1 className="text-xl text-gray-800 font-semibold">
          {selectedConversation?.name || "Select a user"}
        </h1>
        <span
          className={`text-sm font-medium ${
            getOnlineUserStatus(selectedConversation) === "Online"
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {getOnlineUserStatus(selectedConversation)}
        </span>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4 justify-end pr-2">
        {/* Video Call Icon */}
        <IoVideocam
          className="text-2xl text-green-600 cursor-pointer hover:text-green-800 duration-300"
          title="Video Call"
        />
        {/* Voice Call Icon */}
        <IoCall
          className="text-2xl text-blue-600 cursor-pointer hover:text-blue-800 duration-300"
          title="Voice Call"
        />
        {/* Three Dots (More options) */}
        <IoEllipsisHorizontal
          className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800 duration-300"
          title="More options"
        />
      </div>
    </div>
  );
}

export default Chatuser;
