import { createSlice } from "@reduxjs/toolkit";

const busesDataSlice = createSlice({
  name: "busesData",
  initialState: { busesData: [] },
  reducers: {
    setInitialData(state, action) {
      state.busesData = action.payload;
    },
  },
});

export default busesDataSlice;
