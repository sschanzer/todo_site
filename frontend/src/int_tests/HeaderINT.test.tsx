import { describe, expect, it } from "vitest";
import axios from "axios";
import {
  changeSelectedTasks,
  createTask,
  deleteTasks,
} from "../components/Header";

describe("Header", () => {
  describe("createTask()", () => {
    it("retuns a dictionary with the keys itemCreated and id with the value true and id of new created task", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const newTasks = await createTask("new task");

      expect(newTasks).toStrictEqual({ itemCreated: true, id: 7 });
    });
  });

  describe("changeSelectedTasks", () => {
    it("will return true if it successfully changed the selected tasks completed status", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const changedSelectedTasks = await changeSelectedTasks([1, 2, 3]);

      expect(changedSelectedTasks).toBe(true);
    });
  });

  describe("deleteTasks()", () => {
    it("will return if it successfully deleted all selected tasks", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const deletedTasks = await deleteTasks([1, 2, 3]);

      expect(deletedTasks).toBe(true);
    });
  });
});
