import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DefaultLayout from "./layout/DefaultLayout";

const queryClient = new QueryClient();

export const AuthContext = createContext();

import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

const AuthRoute = () => {
  const { authState } = useContext(AuthContext);
  return authState ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

function App() {
  const [authState, setAuthState] = useState(() => {
    return JSON.parse(localStorage.getItem("authState"));
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route element={<AuthRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="/dashboard/sign-in" element={<SignUp />} />
                </Route>
              </Route>
              <Route path="*" element={<h2>page not found</h2>} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
