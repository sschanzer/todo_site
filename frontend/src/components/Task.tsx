import React from "react";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

export interface TaskProps {
  task: ITask;
  allTasks: ITask[];
  setAllTasks: (pendingTasks: ITask[]) => void;
}

export const changeTaskStatus = async (id: number) => {
  let response = await axios.put(`change_status/${id}`);
  return response.data.changed;
};

export const Task: React.FC<TaskProps> = ({ task, allTasks, setAllTasks }) => {
  const changeStatus = async (clicked: boolean, taskToChange: ITask) => {
    let response = await changeTaskStatus(taskToChange["id"]);
    if (response) {
      setAllTasks(allTasks.filter((task) => task != taskToChange));
      taskToChange.completed = clicked;
      setAllTasks([...allTasks]);
    }
  };

  return (
    <Row className="task">
      <Col xs={8} id={`task${task.id}`} className="taskTitle">
        {task.title}
      </Col>
      <Col xs={4} className="checkHolder">
        <Form.Check
          id={`taskCheck${task.id}`}
          type="checkbox"
          name="checkbox"
          className="check"
          checked={task.completed}
          onChange={(event) => changeStatus(event.target.checked, task)}
        />
        <Form.Label for="checkbox">c</Form.Label>
      </Col>
    </Row>
  );
};
