import React from "react";
import { useAuth } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import Right from "./Home/right/Right";
import Left from "./Home/left/Left";
import Logout from "./Home/left1/Logout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  const [authUser, , loading] = useAuth(); // Destructure authUser and loading

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until auth is determined
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                 <Logout />
                <Left />
                <Right /> 
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />} />

        <Route path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
