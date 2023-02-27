import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from "react-test-renderer";
import axios from "axios";
import { createTask, deleteTasks } from "../components/Header";
import { Header } from "../components/Header";
import { ITask } from "../App";
import { isTaskTitleEmpty } from "../components/Header";
import { createTaskResponse } from "../components/Header";
import { changeSelectedTasks } from "../components/Header";
import { bool } from "prop-types";

vi.mock("axios");

describe("Header", () => {
  describe("createTask()", () => {
    it("returns a dictionary with itemCreated and id as keys, where itemCreated's value is true and id's value is the task's id", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.post.mockResolvedValue({
        data: { itemCreated: true, id: 1 },
      })<createTaskResponse>;

      const newTasks = await createTask("new task/");

      expect(newTasks).toStrictEqual({ itemCreated: true, id: 1 });
    });
  });

  describe("changeSelectedTasks()", () => {
    it("returns true if multiple tasks are successfully updated", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.put.mockResolvedValue({
        data: { success: true },
      });

      const changedMultipleTasks = await changeSelectedTasks([1, 2, 3]);

      expect(changedMultipleTasks).toBeTruthy();
    });
  });

  describe("isTaskTitleEmpty()", () => {
    it("will return true if input has something other than whitespace", () => {
      const cleanInput = isTaskTitleEmpty("    yes    ");

      expect(cleanInput).toBe(false);
    });

    it("will return false if input has only whitespace", () => {
      const cleanInput = isTaskTitleEmpty("        ");

      expect(cleanInput).toBe(true);
    });
  });

  describe("deleteTasks()", () => {
    it("returns true if tasks are deleted", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.delete.mockResolvedValue({
        data: { success: true },
      });

      const deletedTasks = await deleteTasks([1, 2, 3]);

      expect(deletedTasks).toBe(true);
    });
  });

  it("will create and match snapshot", () => {
    let allTasks: ITask[] = [];
    const setAllTasks = (newAllTasks: ITask[]) => {
      allTasks = newAllTasks;
    };
    let selectedTasks: number[] = [];
    const setSelectedTasks = (taskIdList: number[]) => {
      selectedTasks = taskIdList;
    };
    let showCompleted: boolean = true;
    let showPending: boolean = true;
    const setShowCompleted = (show: boolean) => {
      showCompleted = show;
    };
    const setShowPending = (show: boolean) => {
      showPending = show;
    };

    const myHeader = TestRenderer.create(
      <Header
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
        showCompleted={showCompleted}
        showPending={showPending}
        setShowCompleted={setShowCompleted}
        setShowPending={setShowPending}
      />
    );

    expect(myHeader).toMatchSnapshot();
  });
});
