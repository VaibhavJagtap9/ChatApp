import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Function to send a message and save it in the database
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { _id: receiverId } = req.params;
    const senderId = req.user._id; // Current logged-in user
    
    // Check if a conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages"); // Populate messages in the conversation
    
    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [], // Initialize with an empty messages array
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Save the new message and add it to the conversation's messages array
    conversation.messages.push(newMessage._id);
    
    await Promise.all([conversation.save(), newMessage.save()]); // Save both the conversation and the new message

    // Send real-time update to the receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Return the newly created message as a response
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve messages of a specific conversation
export const getMessage = async (req, res) => {
  try {
    const { _id: chatUser } = req.params;
    const senderId = req.user._id; // Current logged-in user

    // Find the conversation between the sender and the chat user
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages"); // Populate the messages in the conversation
    
    // If no conversation exists, return an empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    // Return the messages of the conversation
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
