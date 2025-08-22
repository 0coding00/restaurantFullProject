import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import MealItem from "./MealItem";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Paper,
} from "@mui/material";

export default function FindMealSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event", { searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = (
    <Typography variant="body1" sx={{ mt: 2 ,color: 'black',textAlign:'center'  }}>
      Please enter a search term to find events.
    </Typography>
  );

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title={"An Error Occurred"}
        message={error.info?.message || "Failed to fetch"}
      />
    );
  }

  if (data) {
    content = (
      <List>
        {data.map((event) => (
          <ListItem key={event.id} sx={{ p: 0, mb: 1 ,display:'flex',flexDirection:'column'}}>
            <Paper sx={{ width: "50%", p: 1 ,display:'flex ',justifyContent:'center',textAlign:'center' }}>
              <MealItem event={event} />
            </Paper>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Box
      component="section"
      id="all-events-section"
      sx={{ my: 4, px: 2 }}
    >
      <Box
        component="header"
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{color:'black'}}>Find your meal!</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", gap: 1, width: "100%", maxWidth: 500 }}
        >
          <TextField
            fullWidth
            placeholder="Search meals"
            inputRef={searchElement}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Box>
      </Box>

      {content}
    </Box>
  );
}
