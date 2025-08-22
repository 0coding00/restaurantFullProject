import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import {QueryClientProvider, useQuery} from '@tanstack/react-query'
import Meals from './components/Events/Meals.jsx';
import MealDetails from './components/Events/MealDetails.jsx';
import NewMeal from './components/Events/NewMeal.jsx';
import EditMeals,{action as editEventAction,loader as updateEventLoader} from './components/Events/EditMeals.jsx';
import { queryClint } from './util/http.js';
import Cart from './components/Events/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sendCartToBackend ,recieveCartFromBackend} from './store/cart.js';
import { uiAction } from './store/ui.js';
import AuthModal from './components/Auth/AuthModal.jsx';
import ErrorPage from './components/UI/ErrorPage.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/events" />,
    errorElement:<ErrorPage/>
  },
  {
    path: '/events',
    element: <Meals />,
    children: [
      {
        path: 'new',
        element: <NewMeal />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
  path: '/events/auth/:mode', 
  element: <AuthModal />,
},
    ],
  },

  {
    path: '/events/:id',
    element: <MealDetails />,
    children: [
      {
        path: '/events/:id/edit',
        element: <EditMeals />,
        loader:updateEventLoader,
        action:editEventAction,
      },
    ],
  },
]);

  function App() {
    const dispatch=useDispatch();
    const cart=useSelector((state)=>state.cart);
    useEffect(()=>{
    dispatch(recieveCartFromBackend());
    },[dispatch])
    useEffect(()=>{
      dispatch(sendCartToBackend(cart))
    },[dispatch,cart])
    return <QueryClientProvider client={queryClint}><RouterProvider router={router} /></QueryClientProvider>;
  }

  export default App;
