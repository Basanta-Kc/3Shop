/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(() => {
    return JSON.parse(localStorage.getItem("authState"));
  });

  const isAuthenticated = () => {
    // Parse the given expiration date
    const expDate = new Date(authState?.expiresAt);

    // Get the current date and time
    const currentDate = new Date();

    // Compare the expiration date with the current date
    return currentDate < expDate;
  };

  const login = (authUser) => {
    setAuthState(authUser);
    localStorage.setItem("authState", JSON.stringify(authUser));
    toast.success(authUser.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigate("/");
  };

  //Student todo:  handle logout, signup

  return (
    <AuthContext.Provider
      value={{
        authState,
        isAuthenticated,
        setAuthState,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// todo: replace all useContext(AuthContext) with useAuth
export function useAuth() {
  return useContext(AuthContext);
}
