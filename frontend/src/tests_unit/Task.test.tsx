import {
  deleteTask,
  Task,
  changeTaskStatus,
  changeTaskTitle,
} from "../components/Task";
import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from "react-test-renderer";
import { ITask } from "../App";
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

  describe("deleteTask()", () => {
    it("returns true if tasks is deleted", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.delete.mockResolvedValue({
        data: { success: true },
      });

      const deleted = await deleteTask(1);

      expect(deleted).toBe(true);
    });
  });

  describe("changeTaskTitle()", () => {
    it("will return true when changing the task title", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.put.mockResolvedValue({
        data: { changed: true },
      });

      const changed = await changeTaskTitle(1, "hello");

      expect(changed).toBe(true);
    });
  });

  it("will create and match a snapshot", () => {
    let selectedTasks: number[] = [];
    const setSelectedTasks = (newList: number[]) => {
      selectedTasks = newList;
    };
    let allTasks: ITask[] = [];
    const setAllTasks = (taskList: ITask[]) => {
      allTasks = taskList;
    };

    const header = TestRenderer.create(
      <Task
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        task={{ id: 1, title: "Style", completed: false }}
      />
    );

    expect(header).toMatchSnapshot();
  });
});
