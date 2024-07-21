import NavBar from "../components/NavBar";
import BannerCarousel from "../components/Carousel";
import Products from "../components/Products";

export default function Home() {
  // NavBar
  // Carousel
  // Latest Products
  // Featured Products
  return (
    <>
      <NavBar />
      <BannerCarousel />
      <Products title="Featured Products" />
      <Products title="Latest Products" />
    </>
  );
}
