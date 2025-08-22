import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Box } from '@mui/material';

import Modal from '../UI/Modal.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { createNewEvent, queryClint } from '../../util/http.js';
import MealForm from './MealForm.jsx';

export default function NewMeal() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClint.invalidateQueries('events');
      navigate('/events');
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <MealForm onSubmit={handleSubmit}>
        {isPending && (
          <Button variant="outlined" disabled>
            Submitting...
          </Button>
        )}
        {!isPending && (
<Box
  sx={{
    display: 'flex',
    gap: 2,
    justifyContent: 'flex-end', // always right-aligned
    flexWrap: 'wrap',
  }}
>
  <Button
    component={RouterLink}
    to="../"
    variant="text"
    color="secondary"
  >
    Cancel
  </Button>

  <Button type="submit" variant="contained" color="primary">
    Add to Meals
  </Button>
</Box>

        )}
      </MealForm>

      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            error.info?.message ||
            'Failed to send event, please check your input and try again later'
          }
        />
      )}
    </Modal>
  );
}
