import { Link, useNavigate } from "react-router-dom";
import { cartAction } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Typography,
  IconButton,
  Box,
  Button,
  Divider,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.totalPrice || 0),
    0
  );

  const closeCart = () => {
    navigate("../");
  };

  return (
    <Dialog open={true} onClose={closeCart} maxWidth="sm" fullWidth>
      <DialogTitle>Cart Content</DialogTitle>
      <DialogContent>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="body2">
                      {Number(item.price)}$ x {item.quantity}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      color="error"
                      onClick={() =>
                        dispatch(cartAction.removeFromCart({ id: item.id }))
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        dispatch(
                          cartAction.addToCart({
                            id: item.id,
                            price:Number(item.price) ,
                            title: item.title,
                          })
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Total Price:</Typography>
              <Typography variant="h6">{totalPrice.toFixed(2)} $</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
              <Button variant="contained" color="success">
                Checkout
              </Button>
              <Button
                component={Link}
                to="../"
                variant="outlined"
                color="secondary"
                onClick={closeCart}
              >
                Close
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
