import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ImagePicker from "../ImagePicker.jsx";
import { fetchSelectableImages } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function MealForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isPending, isError } = useQuery({
    queryKey: ["events-images"],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = Object.fromEntries(formData);

    onSubmit({
      ...form,
      image: selectedImage,
      price: Number(form.price),
    });
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        overflow: "hidden",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Title"
              name="title"
              defaultValue={inputData?.title ?? ""}
              required
              fullWidth
              size={isMobile ? "medium" : "small"}
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Price"
              name="price"
              type="number"
              inputProps={{ min: 0, step: "0.01", inputMode: "decimal" }}
              defaultValue={inputData?.price ?? ""}
              required
              fullWidth
              size={isMobile ? "medium" : "small"}
            />
          </Grid>

          <Grid item xs={12}>
            {isPending && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} />
                <Typography>Loading selectable images...</Typography>
              </Box>
            )}

            {isError && (
              <ErrorBlock
                title="An error occurred when fetching images"
                message="Failed to fetch images"
              />
            )}

            {data && (
              <Box
                sx={{
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 1.5,
                  overflowX: "auto",
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Select an image
                </Typography>
                <ImagePicker
                  images={data}
                  onSelect={handleSelectImage}
                  selectedImage={selectedImage}
                />
              </Box>
            )}
          </Grid>

<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" ,   width: {
        xs: "90%",   // small screens
        sm: "95%",   // medium screens
        md: "100%",  // large screens
      },}}>
  <Box
    sx={{
      width: {
        xs: "90%",   
        sm: "95%",   
        md: "100%",   
      },
    }}
  >
    <TextField
      label="Description"
      name="description"
      defaultValue={inputData?.description ?? ""}
      multiline
      rows={isMobile ? 3 : 5} 
      fullWidth
      InputProps={{
        sx: {
          fontSize: { xs: "0.85rem", sm: "0.95rem" },
        },
      }}
      InputLabelProps={{
        sx: {
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        },
      }}
    />
  </Box>
</Grid>



        </Grid>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          {children}
        </Box>
      </Box>
    </Paper>
  );
}
