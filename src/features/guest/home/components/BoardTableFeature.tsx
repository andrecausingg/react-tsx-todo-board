// Component
import BoardColumnComponent from "../../../../component/board/BoardColumnComponent";

// Redux hooks
import { useAppSelector } from "../../../../redux/hooks";

// Redux | States and actions
import { selectTodoDragAndDrop } from "../../../../redux/features/board/todoBoardDragAndDropSlice";

// Custom Hook
import { useDragAndDrop } from "../../../../hooks/board/useDragAndDrop";

const BoardTable: React.FC = () => {
  // Redux | state destructor
  const { boardColumns, boardTasks } = useAppSelector(selectTodoDragAndDrop);

  // Custom Hook | destructor
  const { allowDrop, onDragStart, onDrop } = useDragAndDrop();

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Board Todo</h1>
      </div>

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
    </div>
  );
};

export default BoardTable;
