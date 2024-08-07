import { Skeleton, Grid } from "@mui/material";
import Product from "../components/Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AllProducts() {
  const { data, isPending } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => {
      return axios.get("/api/home/products/all");
    },
  });

  if (isPending) {
    return <Skeleton />;
  }


  return (
    <>
      <Grid container spacing={2} sx={{ p: 4 }}>
        {data.data.products.map((product) => {
          return (
            <Grid key={product._id} item xs={3}>
              <Product product={product} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
