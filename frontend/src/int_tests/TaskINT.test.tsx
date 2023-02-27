import { describe, expect, it } from "vitest";
import axios from "axios";
import {
  changeTaskStatus,
  deleteTask,
  changeTaskTitle,
} from "../components/Task";

describe("Task", () => {
  describe("changeTaskStatus()", () => {
    it("Will return true if the completed status of a task was updated.", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const success = await changeTaskStatus(1);

      expect(success).toBe(true);
    });
  });

  describe("deleteTask()", () => {
    it("will return true if task is deleted", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const deleted = await deleteTask(4);

      expect(deleted).toBe(true);
    });
  });

  describe("changeTaskTitle()", () => {
    it("will return true if task title was changed", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const changed = await changeTaskTitle(5, "hello");

      expect(changed).toBe(true);
    });
  });
});
