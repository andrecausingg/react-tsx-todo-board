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
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        {boardColumns.map((column) => (
          <BoardColumnComponent key={column.id} boardColumnProps={column} />
        ))}
      </div>
    </div>
  );
};

export default BoardTable;
