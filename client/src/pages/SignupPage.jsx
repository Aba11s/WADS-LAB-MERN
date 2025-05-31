// src/pages/SignupPage.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signup, reset } from "../features/auth/authSlice";
import { Navigate } from "react-router";
import NavbarComponent from "../components/NavbarComponent";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    personal_id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone_number: "",
  });

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(signup(formData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && user) {
      toast.success("Signup successful!");
    }
  }, [user, isSuccess, isError, message]);

  if (user) return <Navigate to="/" />;

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-lg text-green-800 font-semibold mb-4">Create an account</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-3 w-80">
          <input name="personal_id" placeholder="Personal ID" onChange={onChange} className="border p-2 rounded-md" required />
          <input name="name" placeholder="Name" onChange={onChange} className="border p-2 rounded-md" required />
          <input type="email" name="email" placeholder="Email" onChange={onChange} className="border p-2 rounded-md" required />
          <input type="password" name="password" placeholder="Password" onChange={onChange} className="border p-2 rounded-md" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={onChange} className="border p-2 rounded-md" required />
          <input name="address" placeholder="Address" onChange={onChange} className="border p-2 rounded-md" required />
          <input name="phone_number" placeholder="Phone Number" onChange={onChange} className="border p-2 rounded-md" required />
          <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
