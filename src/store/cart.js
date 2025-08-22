import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { uiAction } from "./ui";
const cartSlice=createSlice({
  name:'cart',
  initialState:{items:[],totalQuantity:0},
  reducers:{
    updateCart(state,action){
      state.items=action.payload.items;
      state.totalQuantity=action.payload.totalQuantity;
    },
    addToCart(state,action){
const newItem=action.payload;
const existingItem=state.items.find((item)=>item.id===newItem.id);
state.totalQuantity++;
if(!existingItem){
state.items.push({
    id:newItem.id,
    title:newItem.title,
    price:Number(newItem.price),
    quantity:1,
    totalPrice:Number(newItem.price),
})
}   
else{
existingItem.quantity++;
existingItem.totalPrice += Number(newItem.price);
}
},
removeFromCart(state,action){
const id=action.payload.id;
const existingItem=state.items.find((item)=>item.id===id)
state.totalQuantity--;
if(existingItem.quantity===1){
   state.items=state.items.filter((item)=>item.id!==id)
}
else{
    existingItem.quantity--;
    existingItem.totalPrice-=existingItem.price;
}
}
},
})
export const sendCartToBackend = (cart) => {
  return async () => {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: {
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send cart');
      }
    } catch (error) {
      console.error('Error sending cart:', error.message);
    }
  };
};
export const recieveCartFromBackend=()=>{
    return async (dispatch)=>{
        const response=await fetch('http://localhost:3000/orders');
        if(!response.ok){
            const error=new Error('failed to fetch orders from backend');
            throw error;
        }
        const resData=await response.json();
              dispatch(cartAction.updateCart({
            items: resData.orders?.[0]?.items || [],
            totalQuantity: resData.orders?.[0]?.totalQuantity || 0,
            }));
    }
}
export const cartAction=cartSlice.actions;
export default cartSlice;