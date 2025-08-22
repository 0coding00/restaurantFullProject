import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Typography variant="h2" color="error" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Page not found!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("../")}
      >
        Go Back
      </Button>
    </Box>
  );
}
