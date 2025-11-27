    import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
        {
        img: "https://pixabay.com/images/download/business-20031_640.jpg",
        name: "Projectors",
        cost: 200,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/images/download/speakers-4109274_640.jpg",
        name: "Speaker",
        cost: 35,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/images/download/public-speaking-3926344_640.jpg",
        name: "Microphones",
        cost: 45,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/images/download/whiteboard-2903269_640.png",
        name: "Whiteboards",
        cost: 80,
        quantity: 0,
    },

    {
        img: "https://pixabay.com/images/download/signpost-235079_640.jpg",
        name: "Signage",
        cost: 80,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/get/g1ae66165b8000e9770dad5c1735e62dd66fe9bbaeba4b0c7f041a8b3d6f0f679cf9a9e57a8f6e4faff84bb4d61a0efe4db32b3dab265de1cb0aaa3f37f5a640d_1280.jpg",
        name: "LED Screens",
        cost: 400,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/get/g3638b14eea64357118c33d3adc222e827c981d6614db404df20eea776ff6bf9f08d5ef3f1534c631b515cee3293b9509f3d1a31700cfbcb6435fa472e610b710_1280.jpg",
        name: "TV Monitors",
        cost: 150,
        quantity: 0,
    },
    {
        img: "https://pixabay.com/get/gea4be69b95e7a496131161ba9ae9eda57c3c215e4133cf7dfba70f0ec10c2a89274431c412d4638a9226e64d3a4eae31_1280.jpg",
        name: "Stage Lighting",
        cost: 250,
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