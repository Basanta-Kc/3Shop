import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";

export default function DefaultLayout() {
  return (
    <CartProvider>
      <div>
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
