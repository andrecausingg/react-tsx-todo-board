// Component
import BoardCardComponent from "./BoardCardComponent";

// Interface
import type { BoardColumnProps } from "../../interface/board/boardColumn";

// Mantine
import { ScrollArea } from "@mantine/core";

export const BoardColumnComponent: React.FC<BoardColumnProps> = ({
  boardColumnProps,
  boardTaskProps,
  allowDrop,
  onDragStart,
  onDrop,
}) => {
  // Board column props | Destructor
  const { title, status } = boardColumnProps;

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
          {boardTaskProps
            .filter((task) => task.status === status)
            .map((task) => (
              <BoardCardComponent
                key={task.id}
                task={task}
                onDragStart={onDragStart}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BoardColumnComponent;
