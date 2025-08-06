import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    {
      name: 'Breakfast',
      cost: 15,
      selected: false,
    },
    {
      name: 'High Tea',
      cost: 10,
      selected: false,
    },
    {
      name: 'Lunch',
      cost: 20,
      selected: false,
    },
    {
      name: 'Dinner',
      cost: 25,
      selected: false,
    }
  ],
  reducers: {
    toggleSelectedMeal: (state, action) => {
      const index = action.payload;
      if (state[index]) {
        state[index].selected = !state[index].selected;
      }
    },
  }
});

export const { toggleSelectedMeal } = mealsSlice.actions;

export default mealsSlice.reducer;