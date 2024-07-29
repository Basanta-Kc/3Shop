import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DefaultLayout from "./layout/DefaultLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Stats from "./components/dashboard/Stats";
import Customers from "./components/dashboard/Customers";

const queryClient = new QueryClient();

export const AuthContext = createContext();

function AdminRoutes() {
  const { authState } = useContext(AuthContext);

  return authState.user.roles.includes("Admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

function App() {
  const [authState, setAuthState] = useState(() => {
    console.log(JSON.parse(localStorage.getItem("authState")));
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
              <Route element={<AdminRoutes />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route path="/dashboard/customers" element={<Customers />} />
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
