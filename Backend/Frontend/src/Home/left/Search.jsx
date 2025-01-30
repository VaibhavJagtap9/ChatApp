import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import userGetAllUsers from "../../context/useGetAllUsers.jsx";
import useConversation from "../../statemanage/useConversation.js";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [allUsers] = userGetAllUsers();
  const { setSelectedConversation } = useConversation();

  // Define handleSubmit separately for clarity
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      toast.error("Search query is empty.");
      return;
    }

    // Find the user by name (case insensitive)
    const conversation = allUsers.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // Clear the search field after selection
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2">
            {/* Search Input */}
            <label className="flex-1 border-[1px] border-gray-300 bg-white rounded-lg flex items-center gap-2 px-4 py-2 shadow-sm">
              <input
                type="text"
                className="w-full outline-none bg-white text-black text-base font-medium placeholder-gray-400"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            {/* Search Button */}
            <button
              type="submit"
              className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full shadow-sm duration-200"
            >
              <IoSearch className="text-2xl text-black" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
