import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers] = useGetAllUsers();

  return (
    <div className="h-full overflow-hidden no-scrollbar">
      {/* Users List */}
      <div
        className="py-2 flex-1 overflow-y-auto no-scrollbar"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={user._id} user={user} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Users;
