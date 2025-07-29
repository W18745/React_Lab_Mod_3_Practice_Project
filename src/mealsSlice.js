import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    { name: 'Desayuno', cost: 50, selected: false },
    { name: 'Té de la tarde', cost: 25, selected: false },
    { name: 'Almuerzo', cost: 65, selected: false },
    { name: 'Cena', cost: 70, selected: false },
  ],
  reducers: {
    toggleMealSelection: (state, action) => {
      // Expect action.payload to be the index of the meal
      const index = action.payload;
      if (typeof index === 'number' && index >= 0 && index < state.length) {
        state[index].selected = !state[index].selected;
      }
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;
