import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, getEventDetails, queryClint } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart.js";
import { uiAction } from "../../store/ui.js";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function MealDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => getEventDetails({ id: params.id, signal }),
  });

  const { mutate, isPending: isPendingDeletion, isError: isErrorDeletion, error: errorDeletion } =
    useMutation({
      mutationKey: ["delete", params.id],
      mutationFn: deleteEvent,
      onSuccess: () => {
        queryClint.invalidateQueries({ queryKey: ["events"], refetchType: "none" });
        navigate("/events");
      },
    });

  const handleDelete = () => setIsDeleting(true);
  const handleCancelDelete = () => setIsDeleting(false);
  const deleteConfirmHandler = () => mutate({ id: params.id });

  let content;

  if (isPending) {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <LoadingIndicator />
      </Box>
    );
  }

  if (isError) {
    content = <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch details"} />;
  }

  if (data) {
    content = (
      <Card sx={{ mt: 3 }}>
        {data.image && <CardMedia component="img" sx={{ width: "80%", mx: "auto", mt: 2 }} image={`http://localhost:3000/${data.image}`} alt={data.title} />}
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5">{data.title}</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outlined" component={Link} to="edit">
                Edit
              </Button>
            </Box>
          </Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {data.price} $
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {data.description}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              dispatch(cartAction.addToCart({ id: data.id, price: data.price, title: data.title }));
              dispatch(uiAction.notify(`${data.title} has been added to the cart`));
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Delete confirmation modal */}
      <Dialog open={isDeleting} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            You want to delete this event? This action cannot be undone.
          </Typography>
          {isErrorDeletion && (
            <ErrorBlock
              title="An error occurred while deleting this event"
              message={errorDeletion.info?.message || "Failed to delete this event"}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={deleteConfirmHandler} color="error" variant="contained" disabled={isPendingDeletion}>
            {isPendingDeletion ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Outlet />
      <Header>
        <Button component={Link} to="/events" variant="text">
          View all Meals
        </Button>
      </Header>

      <Box component="article" sx={{ mt: 3 }}>
        {content}
      </Box>
    </>
  );
}
