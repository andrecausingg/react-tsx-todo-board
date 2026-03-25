// Mantine
import { Badge, Divider } from "@mantine/core";

// Interface
import type { BoardCardProps } from "../../../../interface/board/boardCard";

// Hooks
import { useDragAndDrop } from "../../../../hooks/board/useDragAndDrop";

// Tabler
import { IconTrashFilled } from "@tabler/icons-react";

// Date handling
import dayjs from "dayjs";

export const BoardCardFeature: React.FC<BoardCardProps> = ({ task }) => {
  // Custom Hook | destructor
  const { onDragStart, deleteTodo } = useDragAndDrop();

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

  // Badge logic
  let badgeText = "";
  let badgeColor: "red" | "yellow" | "gray" = "gray";
  if (task.expired_at) {
    if (dayjs(task.expired_at).isBefore(dayjs(), "day")) {
      badgeText = "Expired";
      badgeColor = "gray";
    } else if (dayjs(task.expired_at).isSame(dayjs().add(1, "day"), "day")) {
      badgeText = "Expiring Tomorrow";
      badgeColor = "red";
    }
  }

  return (
    <div
      draggable
      onDragStart={(e) =>
        onDragStart(e, task.id, task.uuid_todo_id, task.status)
      }
      className={`bg-gray-100 p-3 rounded-xl shadow mb-2 cursor-grab border-l-4 m-x-2 ${statusBorderColor}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-md text-2xl">{task.title}</h3>
        {badgeText && (
          <Badge color={badgeColor} variant="filled">
            {badgeText}
          </Badge>
        )}
      </div>

      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-400">Exp: {task.expired_at}</p>

      <Divider className="my-2" />

      <div className="flex items-center justify-between">
        <p className="text-xs font-medium mt-1">
          <span className={`capitalize ${statusTextColor}`}>
            {task.status.replace("_", " ")}
          </span>
        </p>
        <IconTrashFilled
          onClick={() => deleteTodo(task.id, task.uuid_todo_id)}
          className={`${statusTextColor} hover:text-red-500 cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default BoardCardFeature;
