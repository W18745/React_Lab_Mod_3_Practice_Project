import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
        {
        img: "https://pixabay.com/photos/business-computer-conference-20031/",
        name: "Projectors",
        cost: 200,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/photos/speakers-bluetooth-tech-speaker-4109274/",
        name: "Speaker",
        cost: 35,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/photos/public-speaking-mic-microphone-3926344/",
        name: "Microphones",
        cost: 45,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/photos/whiteboard-dry-erase-marker-blank-2903269/",
        name: "Whiteboards",
        cost: 80,
        quantity: 0,
    },

    {
        img: "https://pixabay.com/photos/signpost-waypoint-wood-grain-board-235079/",
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