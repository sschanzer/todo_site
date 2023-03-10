import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup } from "react-bootstrap";
import { ITask } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";

// set up to pass pending task and setpending tasks into Header
interface HeaderProps {
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
}

// export so we can run tests on createTaskResponse
export interface createTaskResponse {
  createdItem: boolean;
  id: number;
}

export const createTask = async (
  taskTitle: string
): Promise<createTaskResponse> => {
  let response = await axios.post("new_task/", {
    name: taskTitle,
  });
  return response["data"];
};

export const Header: React.FC<HeaderProps> = ({ allTasks, setAllTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let input = newTask.replaceAll(" ", "");
    if (input.length > 1 && input != "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newTask]);

  const createNewTask = async (
    str: string,
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    let response = await createTask(str);
    if (response.createdItem) {
      setAllTasks([
        ...allTasks,
        { id: response.id, title: str, completed: false },
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
            <form onSubmit={(event) => createNewTask(newTask, event)}>
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
                disabled={isDisabled}
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
