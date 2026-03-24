// Redux hooks
import { useAppDispatch } from "../../redux/hooks";

// Redux | States and actions
import { updateTaskStatus } from "../../redux/features/board/todoBoardDragAndDropSlice";

// Type for return of the hook
interface DragAndDropHandlers {
  allowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: string) => void;
}

export const useDragAndDrop = (): DragAndDropHandlers => {
  const dispatch = useAppDispatch();

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: number) => {
    e.dataTransfer.setData("taskId", String(taskId));
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    const taskId = Number(e.dataTransfer.getData("taskId"));
    if (isNaN(taskId)) return;

    dispatch(updateTaskStatus({ taskId, status }));
  };

  return { allowDrop, onDragStart, onDrop };
};
