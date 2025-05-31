import React, { useEffect, useState } from "react";
import LogoImg from "../assets/logo.png";
import { useNavigate } from "react-router";

const NavbarComponent = () => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem("user");
    setUser(null);
    // Redirect to signin page
    navigate("/signin");
  };

  useEffect(() => {
    const onStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <nav className="flex w-full justify-between items-center bg-green-100 shadow-md py-3 px-10">
      {/* Logo */}
      <a href="/">
        <div className="flex gap-1 justify-center items-center cursor-pointer">
          <img src={LogoImg} alt="logo-image" className="h-6 w-6" />
          <p className="text-lg font-semibold text-green-600 hover:text-green-700 transition ease-in-out">
            ToDoSome
          </p>
        </div>
      </a>

      {/* Navigation Menu */}
      <div className="flex gap-6 justify-center items-center text-green-900 font-semibold">
        <a href="#" className="text-sm">
          My ToDo
        </a>
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : user.email ? (
              <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-semibold">
                {user.email.charAt(0).toUpperCase()}
              </div>
            ) : null}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm py-2 px-4 rounded-md hover:bg-red-500 transition ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/signin"
            className="bg-green-800 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
