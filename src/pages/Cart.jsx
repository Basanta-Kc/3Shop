import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../constant";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "../context/CartContext";

export function Cart() {
  const { cart, setCart } = useCart();
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post("/api/checkout", data);
    },
    onSuccess: (res) => {
      setCart([]);
      location.replace(res.data.url);
    },
  });
  return (
    <List>
      {cart.map((product) => (
        <ListItem
          key={product._id}
          secondaryAction={
            <>
              <IconButton edge="end" aria-label="delete">
                <RemoveIcon />
              </IconButton>
              <Chip
                sx={{ m: 2 }}
                label={product.orderQuantity}
                variant="outlined"
              />
              <IconButton edge="end" aria-label="delete">
                <AddIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemAvatar>
            <Avatar src={SERVER_URL + product.image} />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Rs. ${product.price}`}
          />
        </ListItem>
      ))}
      <ListItem>
        <b>Total Order Amount:</b> Rs.
        {cart.reduce((acc, curr) => {
          return acc + curr.price * curr.orderQuantity;
        }, 0)}
      </ListItem>
      {cart.length > 0 && (
        <Button variant="contained" onClick={() => mutation.mutate(cart)}>
          Proceed to payment
        </Button>
      )}
    </List>
  );
}
