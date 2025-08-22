import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartAction } from "../../store/cart";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function MealItem({ event }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: { xs: "100%", sm: 345 },
        margin: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:3000/${event.image}`}
        alt={event.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {event.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {event.price} $
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            color="warning"
            fullWidth={isMobile}
            onClick={() =>
              dispatch(
                cartAction.addToCart({
                  id: event.id,
                  price: event.price,
                  title: event.title,
                })
              )
            }
          >
            Add to cart
          </Button>

          <Button
            component={Link}
            to={`/events/${event.id}`}
            variant="outlined"
            color="primary"
            fullWidth={isMobile}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
