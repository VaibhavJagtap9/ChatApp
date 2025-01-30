import React from 'react';
import Search from './Search';
import Users from './Users';

const Left = () => {
  return (
    <div className="w-[30%] bg-white text-black h-screen flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white">
        <h1 className="font-bold text-3xl p-5 text-center border-b border-[#128C7E] text-[#128C7E]">
          Chats
        </h1>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-[65px] z-10 bg-white px-6 py-2 border-b border-[#128C7E]">
        <Search />
      </div>

      {/* Divider */}
      <hr className="border-[#128C7E]" />

      {/* User List */}
      <div className="px-6 py-2 overflow-y-auto flex-1">
        <Users />
      </div>
    </div>
  );
};

export default Left;
