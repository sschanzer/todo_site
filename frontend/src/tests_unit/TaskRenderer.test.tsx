import { describe, expect, it } from "vitest";
import TestRenderer from "react-test-renderer";
import { TaskRenderer } from "../components/TaskRenderer";
import { ITask } from "../App";

describe("TaskRenderer", () => {
  it("will create and match a snapshot", () => {
    let completed = true;
    let allTasks: ITask[] = [];
    const setAllTasks = (taskList: ITask[]) => {
      allTasks = taskList;
    };
    let selected: number[] = [];
    const setSelected = (numberList: number[]) => {
      selected = numberList;
    };

    const taskRenderer = TestRenderer.create(
      <TaskRenderer
        completed={completed}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        selectedTasks={selected}
        setSelectedTasks={setSelected}
      />
    );

    expect(taskRenderer).toMatchSnapshot();
  });
});
