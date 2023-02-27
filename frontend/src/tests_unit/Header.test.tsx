import { describe, expect, vi, Mocked, test, it } from "vitest";
import TestRenderer from "react-test-renderer";
import axios from "axios";
import { createTask } from "../components/Header";
import { Header } from "../components/Header";
import { ITask } from "../App";
import { createTaskResponse } from "../components/Header";

vi.mock("axios");

describe("Header", () => {
  describe("createTask()", () => {
    test("returns if a task was created and the created task's id", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.post.mockResolvedValue({
        data: { createdItem: true, id: 1 },
      })<createTaskResponse>;
      const newTasks = await createTask("new task");
      expect(newTasks).toStrictEqual({ createdItem: true, id: 1 });
    });
  });

  it("will create and match snapshot", () => {
    let allTasks: ITask[] = [];
    const setAllTasks = (newAllTasks: ITask[]) => {
      allTasks = newAllTasks;
    };
    const myHeader = TestRenderer.create(
      <Header allTasks={allTasks} setAllTasks={setAllTasks} />
    );
    expect(myHeader).toMatchSnapshot();
  });
});
