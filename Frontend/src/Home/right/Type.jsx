import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs"; // Emoji icon
import EmojiPicker from "emoji-picker-react"; // Emoji picker library
import useSendMessage from "../../context/useSendMessage.js";

function Type() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Toggle emoji picker

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      await sendMessages(message);
      setMessage(""); // Clear message input after sending
    }
  };

  // Handle emoji selection
  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji); // Append emoji to message
    setShowEmojiPicker(false); // Close picker after selection
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-3 h-[12vh] p-3 pb-10 bg-[#ECE5DD] relative">
        <div className="w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Update message state
            placeholder="Type a message"
            className="border border-[#B3B3B3] bg-white rounded-3xl px-5 py-3 w-full text-xl text-black outline-none focus:ring-2 focus:ring-[#25D366] placeholder:text-black"
            disabled={loading} // Disable input if sending
          />
        </div>
        <div className="relative">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)} // Toggle picker
            className="p-3 rounded-full bg-white hover:bg-gray text-black transition-all"
          >
            <BsEmojiSmile className="text-2xl" />
          </button>
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        {/* Send Button */}
        <button
          type="submit"
          className={`p-3 rounded-full bg-[#25D366] text-white ${
            loading ? "opacity-50" : "hover:bg-[#128C7E]"
          } transition-all `}
          disabled={loading} // Disable button while loading
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Type;
