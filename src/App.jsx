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

function PaymentSuccessfull() {
  return <h2>payment successfull</h2>;
}

function App() {
  // Todo: useDebounce hoook
  // Todo: Refactor to different provider
  const [authState, setAuthState] = useState(() => {
    return JSON.parse(localStorage.getItem("authState"));
  });

  // Todo: refactor to diffenrent povider
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) ?? [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productExist = cart.find(({ _id }) => _id === product._id);
    if (productExist) {
      productExist.orderQuantity += 1;
      setCart([...cart]);
    } else {
      product.orderQuantity = 1;
      setCart([...cart, product]);
    }
  };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{ authState, setAuthState, cart, setCart, addToCart }}
        >
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/success" element={<PaymentSuccessfull />} />
                <Route
                  path="/cancel"s
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
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
// todo: order table
// todo: authenticaion expire, auth context, cart context, debounce (custom hook)
// graphql (crud)
// websocket (sockeio) simple chat application
// eventloop (theory)
// typescript
// optional (redux)
