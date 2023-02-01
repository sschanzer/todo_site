import { Tasks } from "../components/Tasks";
import { describe, expect, it } from "vitest";
import TestRenderer from "react-test-renderer";


describe("take a snapshot of Tasks component", () => {
    it("gives a snapshot of Tasks", () => {
        let selected:number[] = []
        const setSelected = (v:number[]) => {selected = v}
        const header = TestRenderer.create(<Tasks setSelected={setSelected} selected={selected} task={{"id":1, "title":"Create Test", "completed":true}}/>)
        expect(header).toMatchSnapshot()
    })
})