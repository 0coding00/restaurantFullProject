import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui";
import fetchSingLog from "./auth";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

export default function AuthModal() {
  const { mode } = useParams();
  const isSignIn = mode === "usersignup";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.ui.token);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const closeAuthModal = () => {
    navigate("../");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const result = await fetchSingLog(data, isSignIn ? "signup" : "login");
      dispatch(uiAction.setIsUser());

      if (result?.status === 401 || result?.status === 422) {
        setError("Invalid credentials or validation failed.");
        setSuccess(null);
        return;
      }

      setSuccess(isSignIn ? "Signup successful!" : "Login successful!");
      setError(null);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={true} onClose={closeAuthModal} maxWidth="xs" fullWidth>
      <DialogTitle>{isSignIn ? "Sign Up" : "Log In"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField
            label="Email"
            name="email"
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="userpassword"
            type="password"
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!!success}
          >
            Submit
          </Button>
        </Box>

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            component={Link}
            to={`/events/auth/user${isSignIn ? "login" : "signup"}`}
            variant="text"
          >
            Click here to {isSignIn ? "Log in" : "Sign up"}
          </Button>

          <Button
            component={Link}
            to="../"
            variant="outlined"
            color="secondary"
            onClick={closeAuthModal}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
