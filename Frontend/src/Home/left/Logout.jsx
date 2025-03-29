import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`relative flex items-center space-x-4 p-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer
        ${
          isSelected
            ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white scale-105 shadow-xl"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      onClick={() => setSelectedConversation(user)}
    >
      {/* Profile Picture & Status */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-gray-300">
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="user avatar"
          className="w-full h-full object-cover"
        />
        {/* Status Indicator */}
        <span
          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white shadow-md
            ${
              isOnline
                ? "bg-green-500 animate-pulse"
                : "bg-gray-400"
            }`}
        />
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h1 className="font-semibold text-lg">{user.name}</h1>
        <span className="text-gray-600 text-sm">{user.email}</span>
      </div>

      {/* Arrow Indicator for Selection */}
      {isSelected && (
        <div className="absolute right-4">
          <span className="text-white text-xl">→</span>
        </div>
      )}
    </div>
  );
}

export default User;
