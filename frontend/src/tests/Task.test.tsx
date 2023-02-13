import { Task } from "../components/Task";
import { describe, expect, it, test } from "vitest";
import TestRenderer from "react-test-renderer";

describe("Tasks", () => {
  describe("Take a snapshot of Tasks component", () => {
    test("returns a snapshot of Tasks", () => {
      let selected: number[] = [];
      const setSelected = (v: number[]) => {
        selected = v;
      };
      const header = TestRenderer.create(
        <Task task={{ id: 1, title: "Create Test", completed: true }} />
      );
      expect(header).toMatchSnapshot();
    });
  });
});
