import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");
  const validatePasswordMatch = (value) => value === password || "Passwords don't match";

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword,
    };

    await axios.post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Sign Up successfully! You can log in.");
          localStorage.setItem("messenger", JSON.stringify(response.data));
          setAuthUser(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-40 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-40 bottom-10 right-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="relative bg-white shadow-2xl rounded-xl p-8 w-11/12 max-w-md border border-gray-300 z-10"
      >
        <h1 className="text-4xl text-blue-600 font-bold text-center mb-6">WhatsApp</h1>
        <h2 className="text-xl text-center mb-4 font-semibold">Create a New Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-blue-700 block text-gray-700">Username</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              {...register("name", { required: "Username is required" })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-blue-700 block text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-blue-700 block text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-blue-700 block text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password" 
              {...register("confirmPassword", { required: "Confirm Password is required", validate: validatePasswordMatch })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-black text-center mt-4 text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-blue-700 hover:underline ml-1">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
