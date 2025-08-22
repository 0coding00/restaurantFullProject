// import axios from 'axios';
//  export async function fetchEvents() {
//     try{
//         const response = await axios.get('http://localhost:3000/events');
//         return response.data.events;
//     }catch(err){
//                 const error = new Error('An error occurred while fetching the events');
//                 error.code = err.response?.status;
//                 error.info = err.response?.data;
//                 throw error;
//     }
//     }
    // fetch 
    import { QueryClient } from "@tanstack/react-query";
    export async function fetchEvents({signal,searchTerm,max}) { 
    let url='http://localhost:3000/events';
    if(max && searchTerm){
        url +='?search='+searchTerm + '&max='+max;
    }
   else if(searchTerm){
        url +='?search=' + searchTerm;
    }
    else if(max){
        url +='?max='+max;
    }
    const response = await fetch(url,{signal:signal});
     if (!response.ok) 
    { const error = new Error('An error occurred while fetching the events');
     error.code = response.status; 
    error.info = await response.json();
     throw error;
     }
     const { events } = await response.json(); 
    return events;
     }
     export async function createNewEvent(eventdata){
        const response=await fetch('http://localhost:3000/events',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(eventdata),
        })
        if(!response.ok){
            const error=new Error('An error occurred while creating the event');
            error.code=response.status;
            error.info=await response.json();
            throw error;
        }
        const {event}=await response.json();
        return event;
     }
     export async function fetchSelectableImages({signal}) {
        const response=await fetch('http://localhost:3000/events/images' , {signal});
        if(!response.ok){
            const error=new Error('An error occurred while selecting image');
            error.code=response.status;
            error.info=await response.json();
            throw error;
        }
        const {images}=await response.json();
        return images;
     }
     export async function getEventDetails({signal,id}) {
        const response=await fetch(`http://localhost:3000/events/${id}`,{signal});
        if(!response.ok){
            const error=new Error('An error occurred while fetch event details');
            error.code=response.status;
            error.info=await response.json();
            throw error;
        }
        const {event}=await response.json();
        return event;
     }  
     export async function deleteEvent({id}) {
        const response=await fetch(`http://localhost:3000/events/${id}`,{
            method:'DELETE'
        });
        if(!response.ok){
            const error=new Error('An error occurred while delete this event');
            error.code=response.status;
            error.info=await response.json();
            throw error;
        }
        return response.json();
     }
          export async function updateEvent({event,id}){
        const response=await fetch(`http://localhost:3000/events/${id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({event}),
        })
        if(!response.ok){
            const error=new Error('An error occurred while creating the event');
            error.code=response.status;
            error.info=await response.json();
            throw error;
        }
        return response.json();
     }
     export const queryClint=new QueryClient();