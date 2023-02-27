import { Task } from "../components/Task";
import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from "react-test-renderer";
import { ITask } from "../App";
import { changeTaskStatus } from "../components/Task";
import axios from "axios";

vi.mock("axios");

describe("Task", () => {
  describe("changeTaskStatus()", () => {
    it("will return if a task's completed value was changed", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.put.mockResolvedValue({
        data: { changed: true },
      });

      const newTasks = await changeTaskStatus(1);

      expect(newTasks).toBeTruthy();
    });
  });

  it("will create and match a snapshot", () => {
    let allTasks: ITask[] = [];
    const setAllTasks = (tl: ITask[]) => {
      allTasks = tl;
    };
    const header = TestRenderer.create(
      <Task
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        task={{ id: 1, title: "Style", completed: false }}
      />
    );

    expect(header).toMatchSnapshot();
  });
});
