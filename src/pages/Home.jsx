import { Skeleton } from "@mui/material";
import BannerCarousel from "../components/Carousel";
import Products from "../components/Products";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  // NavBar
  // Carousel
  // Latest Products
  // Featured Products
  const { data, isPending } = useQuery({
    queryKey: ["home-products"],
    queryFn: () => {
      return axios.get("/api/home/products");
    },
  });
  console.log({ data });
  return (
    <>
      <BannerCarousel />
      {isPending ? (
        <Skeleton />
      ) : (
        <>
          {" "}
          <Products
            title="Featured Products"
            products={data.data.featuredProducts}
          />
          <Products
            title="Latest Products"
            products={data.data.latestProducts}
          />{" "}
        </>
      )}
    </>
  );
}
