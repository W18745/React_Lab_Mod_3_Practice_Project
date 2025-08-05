import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    {
      name: 'Breakfast',
      cost: 15,
      quantity: 0,
      selected: false,
    },
    {
      name: 'High Tea',
      cost: 10,
      quantity: 0,
      selected: false,
    },
    {
      name: 'Lunch',
      cost: 20,
      quantity: 0,
      selected: false,
    },
    {
      name: 'Dinner',
      cost: 25,
      quantity: 0,
      selected: false,
    }
  ],
  reducers: {
    incrementMealQuantity: (state, action) => {
      const index = action.payload;
      if (state[index]) {
        state[index].quantity++;
        state[index].selected = true;
      }
    },
    decrementMealQuantity: (state, action) => {
      const index = action.payload;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
        if (state[index].quantity === 0) {
          state[index].selected = false;
        }
      }
    },
    toggleMealSelection: (state, action) => {
      const index = action.payload;
      if (state[index]) {
        state[index].selected = !state[index].selected;
        if (!state[index].selected) {
          state[index].quantity = 0;
        } else if (state[index].quantity === 0) {
          state[index].quantity = 1;
        }
      }
    },
  }
});

export const { incrementMealQuantity, decrementMealQuantity, toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;
