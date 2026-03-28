import {
  Badge,
  Divider,
  TextInput,
  Textarea,
  ActionIcon,
  Group,
  Select,
} from "@mantine/core";

import type { BoardCardProps } from "../../../../interface/board/boardCard";
import { useDragAndDrop } from "../../../../hooks/board/useDragAndDrop";

import {
  IconEditFilled,
  IconTrashFilled,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

import dayjs from "dayjs";
import { useState } from "react";
import { DateInput } from "@mantine/dates";

export const BoardCardFeature: React.FC<BoardCardProps> = ({ task }) => {
  const { onDragStart, deleteTodo, updateTodo } = useDragAndDrop();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    expired_at: task.expired_at ? new Date(task.expired_at) : null,
    status: task.status,
  });

  const statusBorderColor =
    {
      todo: "border-blue-400",
      in_progress: "border-orange-400",
      done: "border-green-400",
    }[form.status] || "border-gray-300";

  const statusTextColor =
    {
      todo: "text-blue-400",
      in_progress: "text-orange-400",
      done: "text-green-400",
    }[form.status] || "text-gray-300";

  let badgeText = "";
  let badgeColor: "red" | "yellow" | "gray" = "gray";

  if (form.expired_at) {
    if (dayjs(form.expired_at).isBefore(dayjs(), "day")) {
      badgeText = "Expired";
    } else if (dayjs(form.expired_at).isSame(dayjs().add(1, "day"), "day")) {
      badgeText = "Expiring Tomorrow";
      badgeColor = "red";
    }
  }

  const handleSave = () => {
    updateTodo({
      uuid_todo_id: task.uuid_todo_id,
      title: form.title,
      description: form.description,
      expired_at: form.expired_at
        ? dayjs(form.expired_at).format("YYYY-MM-DD")
        : null,
      status: form.status,
    });

    setIsEditing(false);
  };

  // Cancel
  const handleCancel = () => {
    setForm({
      title: task.title,
      description: task.description,
      expired_at: task.expired_at ? new Date(task.expired_at) : null,
      status: task.status,
    });
    setIsEditing(false);
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={(e) =>
        !isEditing && onDragStart(e, task.id, task.uuid_todo_id, task.status)
      }
      className={`bg-gray-100 p-3 rounded-xl shadow mb-2 cursor-grab border-l-4 m-x-2 ${statusBorderColor}`}
    >
      <div className="flex items-center justify-between w-full gap-x-2">
        {isEditing ? (
          <Group gap={4}>
            <ActionIcon color="green" onClick={handleSave}>
              <IconCheck size={16} />
            </ActionIcon>
            <ActionIcon color="red" onClick={handleCancel}>
              <IconX size={16} />
            </ActionIcon>
          </Group>
        ) : (
          <IconEditFilled
            onClick={() => setIsEditing(true)}
            className={`${statusTextColor} cursor-pointer`}
          />
        )}

        {badgeText && <Badge color={badgeColor}>{badgeText}</Badge>}
      </div>

      {isEditing ? (
        <TextInput
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.currentTarget.value })}
          mt="sm"
        />
      ) : (
        <h3 className="font-bold text-md text-2xl mt-3">{task.title}</h3>
      )}

      {isEditing ? (
        <Textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.currentTarget.value })
          }
          mt="xs"
        />
      ) : (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}

      {isEditing ? (
        <DateInput
          value={form.expired_at}
          onChange={(value: string | null) =>
            setForm({
              ...form,
              expired_at: value ? new Date(value) : null,
            })
          }
          mt="xs"
          placeholder="Select expiration date"
        />
      ) : (
        <p className="text-xs text-gray-400">
          Exp: {dayjs(task.expired_at).format("MMM DD, YYYY")}
        </p>
      )}

      {isEditing ? (
        <Select
          value={form.status}
          onChange={(value) => setForm({ ...form, status: value! })}
          data={[
            { value: "todo", label: "Todo" },
            { value: "in_progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
          mt="xs"
        />
      ) : null}

      <Divider className="my-2" />

      <div className="flex items-center justify-between">
        {!isEditing && (
          <p className="text-xs font-medium mt-1">
            <span className={`capitalize ${statusTextColor}`}>
              {task.status.replace("_", " ")}
            </span>
          </p>
        )}

        {!isEditing && (
          <IconTrashFilled
            onClick={() => deleteTodo(task.id, task.uuid_todo_id)}
            className={`${statusTextColor} cursor-pointer`}
          />
        )}
      </div>
    </div>
  );
};

export default BoardCardFeature;
