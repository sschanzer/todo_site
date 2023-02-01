import {describe, expect, it, vi} from "vitest"
import TestRenderer from "react-test-renderer"
import { Mocked } from "vitest"
import axios from "axios"
import { getTasks } from "../App"
import App from "../App"


vi.mock('axios')

describe("Get the data from the database", () => {
    it('creates a mock axios request to test functionality', async () => {
        const mockAxios = axios as Mocked<typeof axios>
        mockAxios.get.mockResolvedValue({data:{completed:[], pending:[]}})
        const tasks = await getTasks()
        expect(tasks).toStrictEqual({completed:[], pending:[]})
    })
})

describe("Make sure nothing changes in my css or html", () => {
    it("will take a snapshot of the header", () => {
        const testApp = TestRenderer.create(<App/>)
        expect(testApp).toMatchSnapshot()
    })
})

