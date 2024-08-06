/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function Product({ product }) {
  const { image, name, price, quantity } = product;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 170 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Rating name="read-only" value="5" readOnly />
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Rs {price}</Button>
        <Button size="small">Quanity {quantity}</Button>
      </CardActions>
    </Card>
  );
}
