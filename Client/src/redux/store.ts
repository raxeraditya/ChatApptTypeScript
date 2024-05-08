import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";

export const store = configureStore({
  reducer: {
    authUser: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
