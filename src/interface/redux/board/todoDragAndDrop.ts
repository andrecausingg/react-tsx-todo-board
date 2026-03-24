import type { BoardColumn } from "../../../interface/board/boardColumn";
import type { BoardTask } from "../../../interface/board/boardTask";

export interface TodoBoardDragAndDropInterface {
  boardColumns: BoardColumn[];
  boardTasks: BoardTask[];
}
