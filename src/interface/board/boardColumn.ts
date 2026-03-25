import type { BoardTask } from "../board/boardTask";

export type BoardColumn = {
  id: number;
  title: string;
  status: string;
};

export type BoardColumnProps = {
  boardColumnProps: BoardColumn;
  boardTaskProps: BoardTask[];
};
