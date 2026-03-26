// Component
import BoardCardComponent from "./BoardCardFeature";

// Interface
import type { BoardColumnProps } from "../../../../interface/board/boardColumn";

// Mantine
import { ScrollArea } from "@mantine/core";

// Hooks
import { useDragAndDrop } from "../../../../hooks/board/useDragAndDrop";

// Tabler
import { IconPencilPlus } from "@tabler/icons-react";

// Redux | States and actions
import {
  // Selector
  selectTodoDragAndDrop,
} from "../../../../redux/features/board/todoBoardDragAndDropSlice";

// Redux hooks
import { useAppSelector } from "../../../../redux/hooks";

export const BoardColumnFeature: React.FC<BoardColumnProps> = ({
  boardColumnProps,
}) => {
  // Custom Hook | destructor
  const { allowDrop, onDrop } = useDragAndDrop();

  // Board column props | Destructor
  const { title, status } = boardColumnProps;

  // Redux | state destructor
  const { boardTasks } = useAppSelector(selectTodoDragAndDrop);

  // Map status to Tailwind text color
  const statusTextColor =
    {
      todo: "text-blue-400",
      in_progress: "text-orange-400",
      done: "text-green-400",
    }[status] || "text-gray-300";

  return (
    <div
      onDrop={(e) => onDrop(e, status)}
      onDragOver={allowDrop}
      className="bg-slate-800 rounded-2xl p-4"
    >
      <h2 className={`text-xl font-bold sticky mb-2 ${statusTextColor}`}>
        {title}
      </h2>
      <ScrollArea h={400}>
        <div>
          {boardTasks
            .filter((task) => task.status === status)
            .map((task) => (
              <BoardCardComponent key={task.id} task={task} />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BoardColumnFeature;
