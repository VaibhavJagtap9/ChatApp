import React, { useEffect, useState } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

// Predefined user avatar images (Ensure these images exist in your public folder)
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
 * Function to assign avatars based on user order.
 * Each user gets a unique avatar (User1 → user1.jpg, User2 → user2.jpg, etc.).
 * If a user logs out, their avatar is freed for future logins.
 */
const getUserAvatar = (userId) => {
  let userAvatars = JSON.parse(localStorage.getItem("userAvatars")) || {};
  let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

  // If user already has an assigned avatar, return it
  if (userAvatars[userId]) {
    return userAvatars[userId];
  }

  // Find the correct avatar for this user based on user number
  const userNumber = parseInt(userId.replace(/\D/g, ""), 10) - 1; // Extract number from userId
  let assignedAvatar = avatarImages[userNumber] || avatarImages[userNumber % avatarImages.length];

  // Check if the assigned avatar is already taken by an online user
  const assignedAvatars = new Set(loggedInUsers.map((id) => userAvatars[id]).filter(Boolean));
  if (assignedAvatars.has(assignedAvatar)) {
    console.warn(`Avatar conflict: User ${userId} could not get ${assignedAvatar}`);
    assignedAvatar = avatarImages.find((img) => !assignedAvatars.has(img));
  }

  // Assign avatar
  userAvatars[userId] = assignedAvatar;
  localStorage.setItem("userAvatars", JSON.stringify(userAvatars));

  // Add user to logged-in users and update localStorage
  if (!loggedInUsers.includes(userId)) {
    loggedInUsers.push(userId);
    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
  }

  return assignedAvatar;
};

/**
 * Remove user from logged-in list on logout.
 * Frees up their avatar for reassignment.
 */
export const removeLoggedInUser = (userId) => {
  let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
  loggedInUsers = loggedInUsers.filter((id) => id !== userId);
  localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
};

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    setUserAvatar(getUserAvatar(user._id));
  }, [user._id]);

  return (
    <div
      className={`hover:bg-slate-100 duration-300 ${isSelected ? "bg-slate-300" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex no-scrollbar space-x-4 px-8 py-7 hover:bg-slate-200 duration-300 cursor-pointer">
        {/* Material UI Avatars */}
        <Stack direction="row" spacing={2}>
          <Avatar alt={user.name} src={userAvatar} sx={{ width: 64, height: 64 }} />
        </Stack>

        {/* User Details */}
        <div>
          <h1 className="font-bold">{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
