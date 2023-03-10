import { describe, expect, it, test, vi } from "vitest";
import TestRenderer from "react-test-renderer";
import { Mocked } from "vitest";
import axios from "axios";
import { getTasks } from "../App";
import App from "../App";

vi.mock("axios");

describe("App", () => {
  describe("getTasks()", () => {
    test("returns tasks from database", async () => {
      const mockAxios = axios as Mocked<typeof axios>;
      mockAxios.get.mockResolvedValue({ data: { tasks: [] } });
      const tasks = await getTasks();
      expect(tasks).toStrictEqual([]);
    });
  });
  it("will take a snapshot of the header", () => {
    const testApp = TestRenderer.create(<App />);
    expect(testApp).toMatchSnapshot();
  });
});
