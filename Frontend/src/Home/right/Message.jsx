import React from "react";

function Message({ message, prevMessage, onDelete }) {
    const authUser = JSON.parse(localStorage.getItem("messenger"));
    const itsme = message.senderId === authUser.user._id; // Check if the message is from the authenticated user  

    // Determine chat alignment (sender on the right, receiver on the left)
    const chatAlignment = itsme ? "justify-end" : "justify-start";

    // WhatsApp colors for sender and receiver messages
    const chatBubbleColor = itsme ? "bg-[#25D366]" : "bg-white"; // Green for sender, white for receiver
    const textColor = itsme ? "text-white" : "text-black"; // Text color for sender (white) and receiver (black)

    // Date Formatting
    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // Format date to display "Today" / "Yesterday" / Actual Date
    const formatDate = (date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

        return date.toLocaleDateString([], {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // Determine if date separator should be shown
    const showDateSeparator =
        !prevMessage || new Date(prevMessage.createdAt).toDateString() !== createdAt.toDateString();

    // Handle message delete on right-click
    const handleRightClick = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this message?")) {
            onDelete(message._id);
        }
    };

    return (
        <>
            {/* Date separator */}
            {showDateSeparator && (
                <div className="flex justify-center py-2">
                    <div className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {formatDate(createdAt)}
                    </div>
                </div>
            )}

            {/* Message bubble */}
            <div className={`flex ${chatAlignment} py-1 px-4`} onContextMenu={handleRightClick}>
                <div className={`chat-bubble ${chatBubbleColor} ${textColor} p-3 rounded-lg max-w-[80%] flex items-center`}>
                    <span className="text-md">{message.message}</span>

                    {/* Message time */}
                    <div className={`text-xs text-gray-500 ${itsme ? "ml-2 text-right" : "ml-2 text-left"} flex-shrink-0 mt-1`}>
                        {formattedTime}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;
