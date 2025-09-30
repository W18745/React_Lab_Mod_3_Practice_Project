    import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
        {
        img: "https://cdn.pixabay.com/photo/2022/02/20/02/29/projector-7023604_1280.jpg",
        name: "Projectors",
        cost: 200,
        quantity: 0,
    },
    {
        img: "https://cdn.pixabay.com/photo/2014/10/25/18/46/speakers-502890_1280.jpg",
        name: "Speaker",
        cost: 35,
        quantity: 0,
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/04/02/20/42/microphone-704257_1280.jpg",
        name: "Microphones",
        cost: 45,
        quantity: 0,
    },
    {
        img: "https://cdn.pixabay.com/photo/2017/03/28/12/16/chairs-2181980_1280.jpg",
        name: "Whiteboards",
        cost: 80,
        quantity: 0,
    },

    {
        img: "https://cdn.pixabay.com/photo/2017/08/06/21/47/signage-2596694_1280.jpg",
        name: "Signage",
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