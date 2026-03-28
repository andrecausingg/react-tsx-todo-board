// Redux hooks
import { useAppDispatch } from "../../redux/hooks";

// Redux | States and actions
import {
  updateTaskStatus,
  deleteTaskById,
} from "../../redux/features/board/todoBoardDragAndDropSlice";

// Api | Todo
import { useApi } from "../../api/todo/todoApi";

// Type for return of the hook
type TaskDetails = {
  id: number;
  uuid_todo_id: string;
  title: string;
  description: string;
  status: string;
  expired_at: string | undefined | null | Date;
};

interface DragAndDropHandlers {
  updateTodo: (
    taskDetails: Partial<TaskDetails> & { uuid_todo_id: string },
  ) => void;
  deleteTodo: (taskId: number, taskUuid: string) => void;
  allowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    taskId: number,
    taskUuId: string,
    taskStatus: string,
  ) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: string) => void;
}

export const useDragAndDrop = (): DragAndDropHandlers => {
  // Redux
  const dispatch = useAppDispatch();

  // Api hooks | Todo
  const useTodoApiMutation = useApi();

  const updateTodo = (
    taskDetails: Partial<TaskDetails> & { uuid_todo_id: string },
  ) => {
    dispatch(updateTaskStatus({ taskDetails }));

    const payload = Object.fromEntries(
      Object.entries(taskDetails).filter(
        ([key, value]) => key !== "uuid_todo_id" && value !== undefined,
      ),
    );

    const api = `/v1/todo/${taskDetails.uuid_todo_id}`;
    const method = "PUT";
    const isFetchEnable = false;

    useTodoApiMutation.mutate({
      payload,
      api,
      method,
      isFetchEnable,
    });
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: number,
    taskUuId: string,
    taskStatus: string,
  ) => {
    e.dataTransfer.setData("taskId", String(taskId));
    e.dataTransfer.setData("taskUuId", taskUuId);
    e.dataTransfer.setData("taskStatus", taskStatus);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
    const taskId = Number(e.dataTransfer.getData("taskId"));
    const taskUuId = e.dataTransfer.getData("taskUuId");
    const currentStatus = e.dataTransfer.getData("taskStatus");

    if (isNaN(taskId)) return;

    if (newStatus === currentStatus) return;

    const payload = {
      status: newStatus,
    };
    const api = `/v1/todo/${taskUuId}`;
    const method = "PATCH";
    const isFetchEnable = false;

    dispatch(updateTaskStatus({ taskId, status: newStatus }));

    useTodoApiMutation.mutate({
      payload,
      api,
      method,
      isFetchEnable,
    });
  };

  const deleteTodo = (taskId: number, taskUuId: string) => {
    dispatch(deleteTaskById(taskId));

    const payload = {};
    const api = `/v1/todo/${taskUuId}`;
    const method = "DELETE";
    const isFetchEnable = false;

    useTodoApiMutation.mutate({
      payload,
      api,
      method,
      isFetchEnable,
    });
  };

  return { allowDrop, onDragStart, onDrop, deleteTodo, updateTodo };
};
