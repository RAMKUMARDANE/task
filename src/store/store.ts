import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const reducer = {
  user: userReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
