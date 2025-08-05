import { createSlice } from '@reduxjs/toolkit';
import {
  conference,
  auditorium,
  presentation,
  largeMeeting,
  smallMeeting
} from './assets/index.js';

export const venueSlice = createSlice({
  name: 'venue',
  initialState: [
    {
      img: conference,
      name: 'Conference Room (Capacity:15)',
      cost: 3500,
      quantity: 0,
    },
    {
      img: auditorium,
      name: 'Auditorium Hall (Capacity:200)',
      cost: 5500,
      quantity: 0,
      maxQuantity: 3,
    },
    {
      img: presentation,
      name: 'Presentation Room (Capacity:50)',
      cost: 700,
      quantity: 0,
    },
    {
      img: largeMeeting,
      name: 'Large Meeting Room (Capacity:10)',
      cost: 900,
      quantity: 0,
    },
    {
      img: smallMeeting,
      name: 'Small Meeting Room (Capacity:5)',
      cost: 1100,
      quantity: 0,
    },
  ],
  reducers: {
    incrementQuantity: (state, action) => {
      const index = action.payload;
      const item = state[index];
      if (item) {
        if (item.name === 'Auditorium Hall (Capacity:200)') {
          if (item.quantity >= 3) return; // max 3
        }
        if (item.maxQuantity && item.quantity >= item.maxQuantity) return;
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const index = action.payload;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;

export default venueSlice.reducer;
