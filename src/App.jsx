import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useState, createContext, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AllProducts from "./pages/AllProducts";
import { Cart } from "./pages/Cart";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DefaultLayout from "./layout/DefaultLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Customers from "./components/dashboard/Customers";
import UserOrders from "./pages/Orders";

import { AuthProvider, AuthContext } from "./context/AuthContext";

const queryClient = new QueryClient();

// todo: keep this in speaparate component
function AdminRoutes() {
  const { authState, isAuthenticated } = useContext(AuthContext);

  return isAuthenticated() && authState.user.roles.includes("Admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

//todo: keep in spearate component
function PaymentSuccessfull() {
  return <h2>payment successfull</h2>;
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/success" element={<PaymentSuccessfull />} />
                <Route
                  path="/cancel"
                  element={<h1>your payment has been cancelled.</h1>}
                />
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
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;

// Student Task:
// 1. When clicked on procedd to payment, if unauthenticated redirect to sigin
// 2. Products CRUD dashboard
// 3. Order Listing in dashboard
// 4. implment searching in prodcuts page
// 5. Add navingation link for products & orders (user profile drop down)

// todo: authenticaion expire, auth context, cart context, debounce (custom hook)
// graphql (crud) -> thursday firday
// websocket (sockeio) simple chat application -> tuesday
// eventloop (theory) -> wedgesday
// typescript, next.js -> next week -> (postgres, todoapp)
