// Redux
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Interface
import type { TodoBoardDragAndDropInterface } from "../../../interface/redux/board/todoDragAndDrop";

// Define the initial state using that type
const initialState: TodoBoardDragAndDropInterface = {
  boardColumns: [
    { id: 1, title: "Todo", status: "todo" },
    { id: 2, title: "In Progress", status: "in_progress" },
    { id: 3, title: "Done", status: "done" },
  ],
  boardTasks: [],
};

// Slice
export const todoDragAndDropSlice = createSlice({
  name: "todoDragAndDropName",
  initialState,
  reducers: {
    // Set all tasks
    setBoardTasks: (state, action) => {
      state.boardTasks = action.payload;
    },
    // Set all column
    setBoardColumns: (state, action) => {
      state.boardColumns = action.payload;
    },
    // Update Task Status
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;

      state.boardTasks = state.boardTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      );
    },
    // Delete Task by ID
    deleteTaskById: (state, action) => {
      const taskIdToDelete = action.payload;

      state.boardTasks = state.boardTasks.filter(
        (task) => task.id !== taskIdToDelete,
      );
    },
  },
});

// Export actions
export const {
  setBoardTasks,
  setBoardColumns,
  updateTaskStatus,
  deleteTaskById,
} = todoDragAndDropSlice.actions;

// State selector
export const selectTodoDragAndDrop = (state: RootState) =>
  state.todoDragAndDropName;

// Reducer export
export default todoDragAndDropSlice.reducer;
