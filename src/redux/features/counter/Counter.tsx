// Redux Hooks
import { useAppSelector, useAppDispatch } from "../../hooks";

// Slice
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "./counterSlice";

const Counter: React.FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div>
        <input type="number" value={count} placeholder="Enter amount" />
        <button
          aria-label="Increment by amount"
          onClick={() => dispatch(incrementByAmount(count))}
        >
          Increment by Amount
        </button>
      </div>
    </div>
  );
};

export default Counter;
