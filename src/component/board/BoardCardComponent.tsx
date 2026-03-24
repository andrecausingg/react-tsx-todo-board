// Interface
import { Divider } from "@mantine/core";
import type { BoardCardProps } from "../../interface/board/boardCard";

export const BoardCardComponent: React.FC<BoardCardProps> = ({
  task,
  onDragStart,
}) => {
  const statusBorderColor =
    {
      todo: "border-blue-400",
      in_progress: "border-orange-400",
      done: "border-green-400",
    }[task.status] || "border-gray-300";

  // Map status to Tailwind text color
  const statusTextColor =
    {
      todo: "text-blue-400",
      in_progress: "text-orange-400",
      done: "text-green-400",
    }[task.status] || "text-gray-300";

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`bg-gray-100 p-3 rounded-xl shadow mb-2 cursor-grab border-l-4 m-x-2 ${statusBorderColor}`}
    >
      <h3 className="font-bold text-md">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-400">Exp: {task.expiration_date}</p>
      <Divider className="my-2" />
      <p className="text-xs font-medium mt-1">
        <span className={`capitalize ${statusTextColor}`}>
          {task.status.replace("_", " ")}
        </span>
      </p>
    </div>
  );
};

export default BoardCardComponent;
