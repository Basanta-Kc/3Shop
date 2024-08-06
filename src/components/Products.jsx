/* eslint-disable react/prop-types */
import { Typography, Grid } from "@mui/material";
import Product from "./Product";

export default function Products({ title, products }) {
  return (
    <>
      <Typography sx={{ mt: 4 }} textAlign="center" variant="h3">
        {title}
      </Typography>
      <Grid container spacing={2} sx={{ p: 4 }}>
        {products.map((product) => {
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
