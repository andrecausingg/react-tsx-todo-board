import type { BoardTask } from "../board/boardTask";

export type BoardColumn = {
  id: number;
  title: string;
  status: string;
};

export type BoardColumnProps = {
  boardColumnProps: BoardColumn;
  boardTaskProps: BoardTask[];
  allowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: string) => void;
};
