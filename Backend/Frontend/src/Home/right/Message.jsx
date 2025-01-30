import React from 'react';

function Message({ message }) {
    const authUser = JSON.parse(localStorage.getItem("messenger"));
    const itsme = message.senderId === authUser.user._id; // Check if the message is from the authenticated user

    // Determine chat alignment (sender on the right, receiver on the left)
    const chatAlignment = itsme ? "justify-end" : "justify-start";

    // WhatsApp colors for sender and receiver messages
    const chatBubbleColor = itsme ? "bg-[#25D366]" : "bg-white"; // Green for sender, white for receiver
    const textColor = itsme ? "text-white" : "text-black"; // Text color for sender (white) and receiver (black)

    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={`flex ${chatAlignment} py-2 px-4`}>
            {/* Message bubble */}
            <div className={`chat-bubble ${chatBubbleColor}  ${textColor} p-4 rounded-lg max-w-[80%] flex items-center`}>
                <span className="text-xl">{message.message}</span>

                {/* Message time */}
                <div className={`text-xl text-gray-500 ${itsme ? "ml-2 text-right" : "ml-2 text-left"} flex-shrink-0 mt-1`}>
                    <div className='text-sm'>
                        {formattedTime}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
