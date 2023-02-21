import React from "react";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useState } from "react";

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

export const changeTaskTitle = async (id: number, name: string) => {
  let response = await axios.put(`task/${id}/`, { name: name });
  return response.data.changed;
};

export const Task: React.FC<TaskProps> = ({
  task,
  allTasks,
  setAllTasks,
  selectedTasks,
  setSelectedTasks,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>(task.title);

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

  const editTaskTitle = async (taskToChange: ITask) => {
    let response = await changeTaskTitle(task.id, newTitle);
    if (response) {
      setAllTasks(allTasks.filter((task) => task !== taskToChange));
      taskToChange.title = newTitle;
      setAllTasks([...allTasks]);
      setTaskTitle(newTitle);
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
      {showForm ? (
        <Col id={`task${task.id}`} xs={7} className="taskTitle">
          {taskTitle}
        </Col>
      ) : (
        <Col
          xs={7}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="taskTitle"
        >
          <Form.Control
            id={`newTitleForm${task.id}`}
            style={{ height: "3vh" }}
            placeholder={taskTitle}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Col>
      )}
      <Col className="checkHolder" xs={2}>
        <Form.Check
          id={`taskCheck${task.id}`}
          type="checkbox"
          name="checkbox"
          checked={task.completed}
          onChange={(event) => changeStatus(event.target.checked, task)}
        />
        <Form.Label for="checkbox">
          {task.completed ? "done" : "pending"}
        </Form.Label>
      </Col>
      {showForm ? (
        <Col xs={2} className="buttonHolder">
          <Button
            id={`deleteBtn${task.id}`}
            className="alterBtn"
            variant="danger"
            onClick={() => deleteATask(task.id)}
          >
            Delete
          </Button>
          <Button
            id={`showChangeForm${task.id}`}
            className="alterBtn"
            variant="warning"
            onClick={() => setShowForm(!showForm)}
          >
            Edit
          </Button>
        </Col>
      ) : (
        <Col xs={2} className="buttonHolder">
          <Button
            className="alterBtn"
            variant="warning"
            onClick={() => [setShowForm(!showForm), setNewTitle(task.title)]}
          >
            Cancel
          </Button>
          <Button
            id={`confirmChange${task.id}`}
            className="alterBtn"
            variant="success"
            onClick={() => [editTaskTitle(task), setShowForm(!showForm)]}
          >
            Confirm
          </Button>
        </Col>
      )}
    </Row>
  );
};
