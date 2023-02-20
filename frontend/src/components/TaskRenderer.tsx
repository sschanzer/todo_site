import { ITask } from "../App";
import { Task, TaskProps } from "./Task";

interface TaskRendererProps {
  completed: boolean;
  allTasks: ITask[];
  setAllTasks: (pendTasks: ITask[]) => void;
}
export const TaskRenderer: React.FC<TaskRendererProps> = ({
  setAllTasks,
  completed,
  allTasks,
}) => {
  return (
    <>
      {allTasks.map((task) =>
        task.completed === completed ? (
          <Task allTasks={allTasks} setAllTasks={setAllTasks} task={task} />
        ) : null
      )}
    </>
  );
};
