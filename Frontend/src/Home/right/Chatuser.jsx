import React, { useEffect, useState } from "react";
import {
  IoCall,
  IoVideocam,
  IoEllipsisHorizontal,
  IoCheckmarkCircle,
  IoCheckmarkCircleOutline,
} from "react-icons/io5"; // Importing icons
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

// Predefined user avatar images
const avatarImages = [
  "/images/avatars/user1.jpg",
  "/images/avatars/user2.jpg",
  "/images/avatars/user3.jpg",
  "/images/avatars/user4.webp",
  "/images/avatars/user5.webp",
  "/images/avatars/user6.jpg",
  "/images/avatars/user7.jpg",
  "/images/avatars/user8.jpg",
  "/images/avatars/user9.jpg",
  "/images/avatars/user10.jpg",
];

/**
 * Assigns unique avatars to users, ensuring no duplicate avatars unless all are used.
 */
const getUserAvatar = (userId, activeUsers) => {
  if (!userId) return avatarImages[0]; // Default avatar if userId is missing

  let userAvatars = {};

  try {
    userAvatars = JSON.parse(localStorage.getItem("userAvatars")) || {};
  } catch (error) {
    console.error("Error reading localStorage:", error);
  }

  // Get unique user IDs in order
  const uniqueUserIds = [...new Set(activeUsers.map((user) => user._id))];

  // Assign avatars in order, looping back if users exceed available images
  uniqueUserIds.forEach((id, index) => {
    if (!userAvatars[id]) {
      userAvatars[id] = avatarImages[index % avatarImages.length];
    }
  });

  try {
    localStorage.setItem("userAvatars", JSON.stringify(userAvatars));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }

  return userAvatars[userId] || avatarImages[0]; // Fallback to default avatar
};

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    if (selectedConversation?._id) {
      setUserAvatar(getUserAvatar(selectedConversation._id, onlineUsers));
    }
  }, [selectedConversation, onlineUsers]);

  // Function to get online status
  const isOnline = (conversation) => {
    if (!conversation || !conversation._id) return false;
    return onlineUsers.includes(conversation._id);
  };

  return (
    <div
      className="sticky top-0 z-10 flex items-center space-x-4 bg-white hover:bg-gray-100 duration-300 p-3 shadow-sm"
      style={{
        minHeight: "70px",
      }}
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <div className="relative">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={userAvatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Status Tick */}
          <div className="absolute -bottom-1 -right-1">
            {isOnline(selectedConversation) ? (
              <IoCheckmarkCircle className="text-blue-500 text-2xl" />
            ) : (
              <IoCheckmarkCircleOutline className="text-red-600 text-2xl" />
            )}
          </div>
        </div>
      </div>

      {/* User Details Section */}
      <div className="flex-grow">
        <h1 className="text-xl md:text-2xl text-gray-800 font-semibold">
          {selectedConversation?.name || "Select a user"}
        </h1>
        <span
          className={`text-sm font-medium ${
            isOnline(selectedConversation)
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {isOnline(selectedConversation) ? "Online" : "Offline"}
        </span>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4 pr-2">
        {/* Video Call Icon */}
        <IoVideocam
          className="text-2xl md:text-3xl text-green-600 cursor-pointer hover:text-green-800 duration-300"
          title="Video Call"
        />
        {/* Voice Call Icon */}
        <IoCall
          className="text-2xl md:text-3xl text-blue-600 cursor-pointer hover:text-blue-800 duration-300"
          title="Voice Call"
        />
        {/* More Options Icon */}
        <IoEllipsisHorizontal
          className="text-2xl md:text-3xl text-gray-600 cursor-pointer hover:text-gray-800 duration-300"
          title="More options"
        />
      </div>
    </div>
  );
}

export default Chatuser;
