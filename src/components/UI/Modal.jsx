import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ children, onClose, title, actions }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // mobile full screen

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: { xs: 0, sm: 2 }, m: { xs: 0, sm: "auto" }, p: 1 },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: { xs: "1rem", sm: "1.25rem" },
            px: { xs: 2, sm: 3 },
            py: 1,
          }}
        >
          {title}
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent
        dividers
        sx={{
          p: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </Box>
      </DialogContent>

      {actions && <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
