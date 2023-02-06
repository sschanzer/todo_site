import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup } from "react-bootstrap";
import { myTasks } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";

// set up to pass pending task and setpending tasks into Header
interface HeaderProps {
  pendingTasks: myTasks[];
  setPendingTasks: (pendingTasks: myTasks[]) => void;
}

// export so we can run tests on createTaskResponse
export interface createTaskResponse {
  createdItem: boolean;
  id: number;
}

export const createTask = async (str: string): Promise<createTaskResponse> => {
  let response = await axios.post("new_task/", { name: str });
  return response["data"];
};

export const Header: React.FC<HeaderProps> = ({
  pendingTasks,
  setPendingTasks,
}) => {
  const [newTask, setNewTask] = useState("");
  const [created, setCreated] = useState(true);

  useEffect(() => {
    let input = newTask.replaceAll(" ", "");
    if (input.length > 1 && input != "") {
      setCreated(false);
    } else {
      setCreated(true);
    }
  }, [newTask]);

  const createNewTask = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("hello");
    let response = await createTask(newTask);
    if (response.createdItem) {
      setPendingTasks([
        ...pendingTasks,
        { id: response.id, title: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={2}>
            <button className="btn btn-primary btn-sm">Delete</button>
          </Col>
          <Col xs={2}>
            <button className="btn btn-primary btn-sm">Status</button>
          </Col>
          <Col xs={1}>
            <label className="form-check-label">P</label>
          </Col>
          <Col xs={2}>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </Col>
          <Col xs={1}>
            <label className="form-check-label">C</label>
          </Col>
          <Col xs={4}>
            <form onSubmit={(event) => createNewTask(event)}>
              <input
                type="text"
                value={newTask}
                placeholder="Task"
                id="createTaskInput"
                onChange={(event) => setNewTask(event.target.value)}
              />
              <button
                className="btn btn-primary"
                type="submit"
                id="createTaskButton"
                disabled={created}
              >
                +
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
