import NavBar from "../components/NavBar";
import BannerCarousel from "../components/Carousel";
import Products from "../components/Products";
import Footer from "../components/Footer";

export default function Home() {
  // NavBar
  // Carousel
  // Latest Products
  // Featured Products
  return (
    <>
      <BannerCarousel />
      <Products title="Featured Products" />
      <Products title="Latest Products" />
    </>
  );
}
