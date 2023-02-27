import { describe, it, expect } from "vitest";
import axios from "axios";
import { getTasks } from "../App";

describe("App", () => {
  describe("getTasks()", () => {
    it("Will return an array of tasks", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const tasks = await getTasks();

      expect(tasks[0].id).toBe(1);
    });
  });
});
