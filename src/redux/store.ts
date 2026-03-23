import { configureStore } from "@reduxjs/toolkit";

// Sample | Test code
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    // Sample
    counter: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch;
