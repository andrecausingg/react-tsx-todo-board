// Redux hooks
import { useAppSelector } from "../../../../redux/hooks";

// Redux | States and actions
import {
  // Selector
  selectTodoDragAndDrop,
} from "../../../../redux/features/board/todoBoardDragAndDropSlice";

// Component
import BoardColumnComponent from "./BoardColumnFeature";

const BoardTable: React.FC = () => {
  // Redux | state destructor
  const { boardColumns } = useAppSelector(selectTodoDragAndDrop);

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {boardColumns.map((column) => (
          <BoardColumnComponent key={column.id} boardColumnProps={column} />
        ))}
      </div>
    </div>
  );
};

export default BoardTable;
