import { useNavigate, useParams, useSubmit, useNavigation, redirect } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import MealForm from "./MealForm.jsx";
import { getEventDetails, updateEvent, queryClint } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

export default function EditMeals() {
  const navigate = useNavigate();
  const params = useParams();
  const eventId = params.id;
  const submit = useSubmit();
  const { state } = useNavigation();
  const submitting = state === "submitting";

  const { data, isError, error } = useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => getEventDetails({ signal, id: eventId }),
    staleTime: 10000,
  });

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  return (
    <Modal onClose={handleClose}>
      {isError && (
        <ErrorBlock
          title="An error occurred while loading data"
          message={error.info?.message || "Failed to fetch data"}
        />
      )}

      {!data && !isError && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
          <Typography sx={{ ml: 1 }}>Loading event data...</Typography>
        </Box>
      )}

      {data && (
        <MealForm inputData={data} onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            {submitting ? (
              <Typography>Sending...</Typography>
            ) : (
              <>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </>
            )}
          </Box>
        </MealForm>
      )}
    </Modal>
  );
}

// Loader function for React Router
export function loader({ params }) {
  return queryClint.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => getEventDetails({ signal, id: params.id }),
  });
}

// Action function for React Router form submission
export async function action({ params, request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await updateEvent({ event: data, id: params.id });
  await queryClint.invalidateQueries(["events"]);
  return redirect("../");
}
