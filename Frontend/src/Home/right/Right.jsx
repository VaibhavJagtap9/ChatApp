import React, { useEffect } from 'react';
import Chatuser from "./Chatuser.jsx";
import Messages from "./Messages.jsx";
import Type from './Type';
import useConversation from '../../statemanage/useConversation.js';
import { useAuth } from '../../context/AuthProvider.jsx';
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp-like icon
import { BsLock } from "react-icons/bs"; // Import lock icon for encryption

export default function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    setSelectedConversation(null);
  }, []);

  return (
    <div className="flex-1 bg-transparent text-black flex flex-col overflow-hidden no-scrollbar">
      <div className="h-full flex flex-col no-scrollbar">
        {!selectedConversation ? (
          <NoChat />
        ) : (
          <>
            <Chatuser />
            <div
              className="py-2 overflow-y-auto no-scrollbar flex-1"
              style={{
                maxHeight: "calc(88vh - 8vh)",
              }}
            >
              <Messages />
            </div>
            <Type />
          </>
        )}
      </div>
    </div>
  );
}

const NoChat = () => {
  const [authUser] = useAuth();
  console.log(authUser);

  return (
    <div className="flex h-screen items-center justify-center bg-transparent overflow-hidden no-scrollbar relative">
      <div className="text-center">
        {/* Add WhatsApp-like icon */}
        <div className="flex justify-center items-center mb-4">
          <FaWhatsapp className="text-7xl text-green-500" />
        </div>
        <h1 className="text-bold font-semibold text-xl text-black">
          Welcome <span>{authUser.user.name}</span>
          <br />
          <br />
          Select a chat to start messaging
        </h1>
      </div>

      {/* Footer with end-to-end encryption text */}
      <div className="absolute bottom-12 w-full flex justify-center items-center">
        <BsLock className="text-gray-500 mr-2" />
        <p className="text-bold text-gray-500">
          End-to-end encrypted
        </p>
      </div>
    </div>
  );
};
