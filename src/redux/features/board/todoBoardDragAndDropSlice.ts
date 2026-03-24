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
 boardTasks: [
  // 10 Todo tasks
  { id: 1, title: "Walk", description: "Walk on beach", expiration_date: "2026-03-25", status: "todo" },
  { id: 2, title: "Read", description: "Read a book", expiration_date: "2026-03-25", status: "todo" },
  { id: 3, title: "Meditate", description: "Morning meditation", expiration_date: "2026-03-25", status: "todo" },
  { id: 4, title: "Plan", description: "Plan the week", expiration_date: "2026-03-25", status: "todo" },
  { id: 5, title: "Email", description: "Reply to emails", expiration_date: "2026-03-25", status: "todo" },
  { id: 6, title: "Clean", description: "Clean the room", expiration_date: "2026-03-25", status: "todo" },
  { id: 7, title: "Grocery", description: "Buy groceries", expiration_date: "2026-03-25", status: "todo" },
  { id: 8, title: "Call", description: "Call family", expiration_date: "2026-03-25", status: "todo" },
  { id: 9, title: "Write", description: "Write journal", expiration_date: "2026-03-25", status: "todo" },
  { id: 10, title: "Stretch", description: "Morning stretch", expiration_date: "2026-03-25", status: "todo" },

  // 10 In Progress tasks
  { id: 11, title: "Run", description: "Run at school", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 12, title: "Project", description: "Work on project", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 13, title: "Coding", description: "Finish coding task", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 14, title: "Cooking", description: "Prepare lunch", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 15, title: "Laundry", description: "Do laundry", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 16, title: "Research", description: "Read articles", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 17, title: "Exercise", description: "Gym session", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 18, title: "Design", description: "Work on UI design", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 19, title: "Meeting", description: "Attend meeting", expiration_date: "2026-03-26", status: "in_progress" },
  { id: 20, title: "Review", description: "Review code", expiration_date: "2026-03-26", status: "in_progress" },

  // 10 Done tasks
  { id: 21, title: "Workout", description: "Gym session", expiration_date: "2026-03-27", status: "done" },
  { id: 22, title: "Shopping", description: "Buy clothes", expiration_date: "2026-03-27", status: "done" },
  { id: 23, title: "Pay Bills", description: "Pay electricity", expiration_date: "2026-03-27", status: "done" },
  { id: 24, title: "Emails", description: "Sent all emails", expiration_date: "2026-03-27", status: "done" },
  { id: 25, title: "Clean Desk", description: "Organized desk", expiration_date: "2026-03-27", status: "done" },
  { id: 26, title: "Backup", description: "Backup laptop", expiration_date: "2026-03-27", status: "done" },
  { id: 27, title: "Cook Dinner", description: "Dinner prepared", expiration_date: "2026-03-27", status: "done" },
  { id: 28, title: "Read Book", description: "Finished reading", expiration_date: "2026-03-27", status: "done" },
  { id: 29, title: "Meditation", description: "Evening meditation", expiration_date: "2026-03-27", status: "done" },
  { id: 30, title: "Walk Dog", description: "Evening walk", expiration_date: "2026-03-27", status: "done" },
  
  ],
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
  },
});

// Export actions
export const { setBoardTasks, setBoardColumns, updateTaskStatus } =
  todoDragAndDropSlice.actions;

// State selector
export const selectTodoDragAndDrop = (state: RootState) =>
  state.todoDragAndDropName;

// Reducer export
export default todoDragAndDropSlice.reducer;
