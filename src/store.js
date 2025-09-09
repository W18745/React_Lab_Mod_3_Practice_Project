// store.js
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './venueSlice';
import avReducer from './avSlice.js';
import mealsReducer from './mealsSlice.js';
// 3. adding into the redux store the avSlice
// 3.2 adding into the redux store the mealsSlice

export default configureStore({
  reducer: {
    venue: venueReducer,    
    av: avReducer,    // same name as the key-value pair 'name: "av" in avSlice.js
    meals: mealsReducer,
  },
});
