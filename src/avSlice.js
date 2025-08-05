import { createSlice } from '@reduxjs/toolkit';
import {
  projector,
  speaker,
  microphone,
  whiteboard,
  signage
} from './assets/index.js';

export const avSlice = createSlice({
  name: 'av',
  initialState: [
    {
      img: projector,
      name: 'Projector',
      cost: 500,
      quantity: 0,
    },
    {
      img: speaker,
      name: 'Speaker',
      cost: 300,
      quantity: 0,
      maxQuantity: 2,
    },
    {
      img: microphone,
      name: 'Microphone',
      cost: 200,
      quantity: 0,
    },
    {
      img: whiteboard,
      name: 'Whiteboard',
      cost: 100,
      quantity: 0,
    },
    {
      img: signage,
      name: 'Signage',
      cost: 150,
      quantity: 0,
    },
  ],
  reducers: {
    incrementAVQuantity: (state, action) => {
      const index = action.payload;
      const item = state[index];
      if (item) {
        if (item.name === 'Speaker' && item.quantity >= 2) return;
        if (item.maxQuantity && item.quantity >= item.maxQuantity) return;
        item.quantity++;
      }
    },
    decrementAVQuantity: (state, action) => {
      const index = action.payload;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementAVQuantity, decrementAVQuantity } = avSlice.actions;

export default avSlice.reducer;
