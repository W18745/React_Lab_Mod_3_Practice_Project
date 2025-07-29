// avSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    {
      img: "https://cdn.pixabay.com/photo/2012/03/01/01/10/business-20031_1280.jpg",
      name: "Proyectores",
      cost: 200,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2019/04/07/09/41/speakers-4109274_1280.jpg",
      name: "Altavoz",
      cost: 35,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2019/01/11/01/54/public-speaking-3926344_1280.jpg",
      name: "Micrófonos",
      cost: 45,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2015/01/08/18/30/white-board-593370_1280.jpg",
      name: "Pizarras",
      cost: 80,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2014/06/18/20/58/directory-371692_640.jpg",
      name: "Señalización",
      cost: 80,
      quantity: 0,
    },
  ],
  reducers: {
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) {
        item.quantity++;
      }
    },
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
