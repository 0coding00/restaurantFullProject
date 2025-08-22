import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import background from "../../assets/background.jpg";

export default function EventsIntroSection() {
  return (
    <Box
      id="overview-section"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        px: 2,
      }}
    >
      <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
        Order your favorite meal <br />
        <strong>or ask a new meal</strong>
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Anyone can organize and join events on React Event!
      </Typography>
      <Button
        component={Link}
        to="/events/new"
        variant="contained"
        color="primary"
        size="large"
      >
        Add new meal to the  menu
      </Button>
    </Box>
  );
}
