import React from "react";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Button } from "react-bootstrap";

export interface TaskProps {
  task: ITask;
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
}

export const changeTaskStatus = async (id: number) => {
  let response = await axios.put(`task/${id}/`);
  return response.data.changed;
};

export const deleteTask = async (id: number) => {
  let response = await axios.delete(`task/${id}/`);
  return response.data.success;
};

export const Task: React.FC<TaskProps> = ({
  task,
  allTasks,
  setAllTasks,
  selectedTasks,
  setSelectedTasks,
}) => {
  const changeStatus = async (clicked: boolean, taskToChange: ITask) => {
    let response = await changeTaskStatus(taskToChange["id"]);
    if (response) {
      setAllTasks(allTasks.filter((task) => task != taskToChange));
      taskToChange.completed = clicked;
      setAllTasks([...allTasks]);
    }
  };

  const deleteATask = async (id: number) => {
    let response = await deleteTask(id);
    if (response) {
      setAllTasks(allTasks.filter((task) => task.id !== id));
    }
  };

  return (
    <Row className="task">
      <Col>
        <Form.Check
          id={`taskSelectedBtn${task.id}`}
          type="checkbox"
          onChange={(event) =>
            event.target.checked
              ? setSelectedTasks([...selectedTasks, task.id])
              : setSelectedTasks(selectedTasks.filter((id) => id !== task.id))
          }
        />
      </Col>
      <Col xs={8} id={`task${task.id}`} className="taskTitle">
        {task.title}
      </Col>
      <Col className="checkHolder" xs={2}>
        <Form.Check
          id={`taskCheck${task.id}`}
          type="checkbox"
          className="check"
          checked={task.completed}
          onChange={(event) => changeStatus(event.target.checked, task)}
        />
        <Form.Label for="checkbox">
          {task.completed ? "done" : "pending"}
        </Form.Label>
        <Col xs={1}>
          <Button
            id={`deleteBtn$(task.id)`}
            className="delBtn"
            variant="danger"
            onClick={() => deleteATask(task.id)}
          >
            Delete
          </Button>
        </Col>
      </Col>
    </Row>
  );
};
