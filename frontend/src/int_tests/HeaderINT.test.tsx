import { describe, expect, it } from "vitest";
import axios from "axios";
import { createTask } from "../components/Header";

describe("Header", () => {
  describe("createTask()", () => {
    it("will return if a task was created and that task's id", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const newTasks = await createTask("new task");

      expect(newTasks.itemCreated).toBe(true);
    });
  });
});
