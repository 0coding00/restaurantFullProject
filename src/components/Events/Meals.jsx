import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from "../Header.jsx";
import EventsIntroSection from "./EventsIntroSection.jsx";
import FindMealSection from "./FindMealSection.jsx";
import NewMealsSection from "./NewMealsSection.jsx";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui.js";
import {
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Events() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.ui.token);

  const logout = () => {
    localStorage.clear();
    dispatch(uiAction.setIsUser(null)); // make sure this sets token to null
  };

  // responsive helpers
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <Outlet />

      <Header>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Desktop buttons */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button component={Link} to="/events/new" variant="contained" color="primary">
              New Event
            </Button>

            <Button
              component={Link}
              to="/events/cart"
              variant="outlined"
              color="secondary"
              sx={{ borderWidth: "3px" }}
              startIcon={
                <Badge badgeContent={totalQuantity} color="secondary">
                  <ShoppingCartIcon sx={{ transform: "scale(1.2)" }} />
                </Badge>
              }
            >
              Cart
            </Button>

            {!token && (
              <Button
                component={Link}
                to="/events/auth/usersignup"
                variant="outlined"
                color="primary"
              >
                Sign Up
              </Button>
            )}

            {token && (
              <Button
                variant="contained"
                color="error"
                onClick={logout}
                endIcon={<LogoutIcon />}
              >
                Log Out
              </Button>
            )}
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton aria-label="menu" color="primary" onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem component={Link} to="/events/new" onClick={closeMenu}>
                New Event
              </MenuItem>
              <MenuItem component={Link} to="/events/cart" onClick={closeMenu}>
                <Badge badgeContent={totalQuantity} color="secondary" sx={{ mr: 1 }}>
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </MenuItem>
              {!token ? (
                <MenuItem
                  component={Link}
                  to="/events/auth/usersignup"
                  onClick={closeMenu}
                >
                  Sign Up
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Log Out
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Header>

      {/* Keep the rest of your app visible */}
      <main>
        <EventsIntroSection />
        <NewMealsSection />
        <FindMealSection />
      </main>
    </>
  );
}
