import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './venueSlice';
import avReducer from './avSlice';
import mealsReducer from './mealsSlice';

console.log('venueReducer:', venueReducer);
console.log('avReducer:', avReducer);
console.log('mealsReducer:', mealsReducer);

export default configureStore({
  reducer: {
    venue: venueReducer,
    av: avReducer,
    meals: mealsReducer,
  },
});
