import { ITask } from "../App";
import { Task, TaskProps } from "./Task";

interface TaskRendererProps {
  completed: boolean;
  allTasks: ITask[];
  setAllTasks: (pendTasks: ITask[]) => void;
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
}
export const TaskRenderer: React.FC<TaskRendererProps> = ({
  setAllTasks,
  completed,
  allTasks,
  selectedTasks,
  setSelectedTasks,
}) => {
  return (
    <>
      {allTasks.map((task) =>
        task.completed === completed ? (
          <Task
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
            allTasks={allTasks}
            setAllTasks={setAllTasks}
            task={task}
          />
        ) : null
      )}
    </>
  );
};
