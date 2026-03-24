import type { BoardTask } from "../board/boardTask";

export type BoardCardProps = {
  task: BoardTask;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: number) => void;
};
