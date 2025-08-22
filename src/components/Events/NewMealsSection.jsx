
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import MealItem from './MealItem.jsx';
import {useQuery } from '@tanstack/react-query';
import {fetchEvents} from '../../util/http.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from '@mui/material';
import { useState } from 'react';

export default function NewMealsSection() {
  const  [maxMeals,setMaxMeals]=useState(3);
  const [showArrow,setShowArrow]=useState(true);
  const {data,isPending,isError,error}= useQuery({
    queryKey:['events',{max:maxMeals}],
    queryFn:({signal,queryKey})=>fetchEvents({signal,...queryKey[1]}),
    staleTime:3000,
    // gcTime:1000,
  })
  const onClick=()=>{
    setMaxMeals(6);
    setShowArrow(false);
  }
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title='An error occurred' message={error.info?.message || 'Failed to fetch'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <MealItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added Meals</h2>
      </header>
      {content}
      {showArrow &&     <button
      onClick={onClick}
      style={{
        width: "100%", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        background: "#e3e3e3",
        border: "none",
        cursor: "pointer",
        marginTop:'4rem',
        borderRadius:'18px',
      }}
    >
      <ExpandMoreIcon style={{ fontSize: 80, color: "black" }} />
    </button>
    }
    </section>
  );
}
