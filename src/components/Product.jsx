/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import { SERVER_URL } from "../constant";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../context/CartContext";

export default function Product({ product }) {
  const { addToCart } = useCart();
  const { image, name, price, quantity } = product;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 170 }}
        image={SERVER_URL + image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Rating name="read-only" value="5" readOnly />
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Typography>Rs. {price} </Typography>
        {quantity === 0 && <Chip label="Out of stock" color="error" />}
        <IconButton
          onClick={() => addToCart(product)}
          color="primary"
          aria-label="add to shopping cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardContent>

      <Typography> </Typography>
      <Typography> </Typography>
    </Card>
  );
}


