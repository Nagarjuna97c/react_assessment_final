import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import busesDataSlice from "./busesData";

const store = configureStore({
  reducer: { auth: authSlice.reducer, buses: busesDataSlice.reducer },
});

export default store;
