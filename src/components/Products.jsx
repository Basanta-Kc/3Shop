import { Typography, Grid } from "@mui/material";
import Product from "./Product";

export default function Products({ title }) {
  return (
    <>
      <Typography sx={{ mt: 4 }} textAlign="center" variant="h3">
        {title}
      </Typography>
      <Grid container spacing={2} sx={{ p: 4 }}>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
      </Grid>
    </>
  );
}
