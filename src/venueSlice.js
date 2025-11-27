// venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const venueSlice = createSlice({
  name: "venue",
  initialState: [
    {
      img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
      name: "Conference Room (Capacity:15)",
      cost: 3500,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/event-venue-1597531_640.jpg",
      name: "Auditorium Hall (Capacity:200)",
      cost: 5500,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/convention-center-3908238_640.jpg",
      name: "Presentation Room (Capacity:50)",
      cost: 700,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
      name: "Large Meeting Room (Capacity:10)",
      cost: 900,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/laptops-593296_640.jpg",
      name: "Small Meeting Room (Capacity:5)",
      cost: 1100,
      quantity: 0,
    },
    {
        img: "https://pixabay.com/get/ge525c696edf95770fc6b824fd077e3aafcaabe57e953f35c5a5987fd7c36a62cdc14c0f1077d652cb1011318f5ea1c5a_1280.jpg",
        name: "Premium Room (Capacity:12)",
        cost: 1500,
        quantity: 0,
      },
      {
        img: "https://pixabay.com/get/gcc4ecd28f5422bf020f38061ee070a48d27543f6fc813d49f84b917e65f0ee597a1daecc513d59f77d722024916ffb2671d9fbaa65d4b20d866daa191d3f1a79_1280.jpg",
        name: "Training Room (Capacity:40)",
        cost: 1000,
        quantity: 0,
      },
      {
        img: "https://pixabay.com/get/gd91a7f4ff05c44b61e22b87c5c0907d28160c2b5be82a098778866e6f6c425fa4128ca2b72758b7ad5add2940974b624960392182437a7aaeafc9e1b827b3664_1280.jpg",
        name: "Social Event Room (Capacity:100)",
        cost: 2500,
        quantity: 0,
      },
  
  ],
  reducers: {
   
    incrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        if (state[index].name === " Auditorium Hall (Capacity:200)" && state[index].quantity >= 3) {
          return;        }
        state[index].quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;
export default venueSlice.reducer;