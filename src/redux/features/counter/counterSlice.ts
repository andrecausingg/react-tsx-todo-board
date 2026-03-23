// Redux library
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Redux Store
import type { RootState } from "../../store";

// Interface
import type { CounterState } from "../../../interface/redux/counter/counter";

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

// Slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Functions | useAppDispatch
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// State | useAppSelector
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
