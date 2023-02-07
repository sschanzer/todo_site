import { Tasks } from "../components/Task";
import { describe, expect, test } from "vitest";
import TestRenderer from "react-test-renderer";

describe("Tasks", () => {
  describe("snapshot of Tasks component", () => {
    test("gives a snapshot of Tasks", () => {
      let selected: number[] = [];
      const setSelected = (v: number[]) => {
        selected = v;
      };
      const header = TestRenderer.create(
        <Tasks
          setSelected={setSelected}
          selected={selected}
          task={{ id: 1, title: "Create Test", completed: true }}
        />
      );
      expect(header).toMatchSnapshot();
    });
  });
});
