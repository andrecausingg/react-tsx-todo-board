// Component
import BoardColumnComponent from "../../../../component/board/BoardColumnComponent";

// Redux hooks
import { useAppSelector } from "../../../../redux/hooks";

// Redux | States and actions
import { selectTodoDragAndDrop } from "../../../../redux/features/board/todoBoardDragAndDropSlice";

// Custom Hook
import { useDragAndDrop } from "../../../../hooks/board/useDragAndDrop";
import { useState } from "react";
import ModalForm from "../../../../component/form/ModalFormComponent";

const BoardTable: React.FC = () => {
  // Redux | state destructor
  const { boardColumns, boardTasks } = useAppSelector(selectTodoDragAndDrop);

  // Custom Hook | destructor
  const { allowDrop, onDragStart, onDrop } = useDragAndDrop();

  const [opened, setOpened] = useState(false);

  const loginFormConfig = [
    {
      label: "Email",
      api_key: "email",
      tag: "TextInput",
      required: true,
    },
    {
      label: "Password",
      api_key: "password",
      tag: "PasswordInput",
      required: true,
    },
  ];

  const registerFormConfig = [
    {
      label: "Email",
      api_key: "email",
      tag: "TextInput",
      required: true,
    },
    {
      label: "Password",
      api_key: "password",
      tag: "PasswordInput",
      required: true,
    },
    {
      label: "Password Confirmation",
      api_key: "password_confirmation",
      tag: "PasswordInput",
      required: true,
    },
  ];

  const todoFormConfig = [
    {
      label: "Title",
      api_key: "title",
      tag: "TextInput",
      required: true,
    },
    {
      label: "Description",
      api_key: "description",
      tag: "Textarea",
      required: true,
    },
    {
      label: "Expired at",
      api_key: "expired_at",
      tag: "DateInput",
      required: true,
    },
  ];

  const networkConfig = {
    api: "http://localhost:8000/api/users",
    method: "POST",
    mutation: null,
  };

  const modalConfig = {
    opened,
    onClose: () => setOpened(false),
    title: "Login Form",
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        {boardColumns.map((column) => (
          <BoardColumnComponent
            key={column.id}
            boardColumnProps={column}
            boardTaskProps={boardTasks}
            allowDrop={allowDrop}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>

      <ModalForm
        formConfig={todoFormConfig}
        networkConfig={networkConfig}
        modalConfig={modalConfig}
      />
    </div>
  );
};

export default BoardTable;
