import { configureStore } from "@reduxjs/toolkit";
import { allReducers } from "./allReducers";

export const store = configureStore({
  reducer: allReducers,
  // devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;