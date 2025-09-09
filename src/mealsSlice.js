// mealsSlice.js
import { createSlice } from '@reduxjs/toolkit';
// 1. including the meal items inside the initialState array
// 2. adding the logic needed for function reducer toggleMealSelection
export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    { name: 'Breakfast', cost: 50, selected: false },
    { name: 'High Tea', cost: 25, selected: false },
    { name: 'Lunch', cost: 65, selected: false },
    { name: 'Dinner', cost: 70, selected: false },
  ],
  // reducer functions:
  reducers: {
    toggleMealSelection: (state, action) => {
      state[action.payload].selected = ! state[action.payload].selected;      // uses [action.payload] to identify the item to update
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;
