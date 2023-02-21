import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button, InputGroup } from "react-bootstrap";
import { ITask } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toggle } from "./Toggle";

// set up to pass pending task and setpending tasks into Header
interface HeaderProps {
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
  showPending: boolean;
  setShowPending: (showPending: boolean) => void;
  showCompleted: boolean;
  setShowCompleted: (showCompleted: boolean) => void;
}

// export so we can run tests on createTaskResponse
export interface createTaskResponse {
  itemCreated: boolean;
  id: number;
}

export const createTask = async (
  taskTitle: string
): Promise<createTaskResponse> => {
  let response = await axios.post("task/", {
    name: taskTitle,
  });
  return response["data"];
};

export const deleteMultTasks = async (lst: number[]) => {
  let response = await axios.delete("delete_multiple", {
    data: { selected: lst },
  });
  return response.data.success;
};

export const changeSelectedTasks = async (selectedList: number[]) => {
  let response = await axios.put("tasks/", { selected: selectedList });
  return response.data.success;
};

export const isTaskTitleEmpty = (taskTile: string) => {
  let cleanInput = taskTile.replaceAll(" ", "");
  if (cleanInput.length >= 1 && cleanInput != "") {
    return false;
  } else {
    return true;
  }
};

export const Header: React.FC<HeaderProps> = ({
  allTasks,
  setAllTasks,
  selectedTasks,
  setSelectedTasks,
  showPending,
  setShowPending,
  showCompleted,
  setShowCompleted,
}) => {
  const [newTask, setNewTask] = useState("");
  const [isSubmittedDisabled, setIsSubmittedDisabled] = useState(true);

  const changingMultipleStatus = async () => {
    let response = await changeSelectedTasks(selectedTasks);
    if (response) {
      allTasks.map((task) => {
        selectedTasks.map((id) => {
          if (task.id === id) {
            console.log(task);
            task.completed = !task.completed;
          }
        });
      });
      setAllTasks([...allTasks]);
      setSelectedTasks([]);
    }
  };

  const deleteMultipleTasks = async () => {
    let response = await deleteMultTasks(selectedTasks);
    if (response) {
      setAllTasks(allTasks.filter((task) => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
    }
  };

  const isChangeStatusDisabled = (): boolean => {
    let myList = selectedTasks;
    return myList.length < 1;
  };

  useEffect(() => {
    isChangeStatusDisabled();
  }, [selectedTasks]);

  useEffect(() => {
    setIsSubmittedDisabled(isTaskTitleEmpty(newTask));
  }, [newTask]);

  const createNewTask = async (
    task: string,
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    let response = await createTask(task);
    console.log(response);
    if (response.itemCreated) {
      setAllTasks([
        ...allTasks,
        { id: response.id, title: task, completed: false },
      ]);
      setNewTask("");
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={4}>
          <Button
            onClick={changingMultipleStatus}
            disabled={isChangeStatusDisabled()}
            id="changeStatusBtn"
          >
            Update
          </Button>
          <Button
            variant="danger"
            onClick={deleteMultipleTasks}
            disabled={isChangeStatusDisabled()}
            id="DeleteMultBtn"
          >
            Delete
          </Button>
        </Col>
        <Col xs={3}>
          <Toggle
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            showPending={showPending}
            setShowPending={setShowPending}
          />
        </Col>
        <Col xs={6} className="formHolder">
          <Form
            style={{ position: "relative" }}
            onSubmit={(event) => createNewTask(newTask, event)}
          >
            <Form.Control
              value={newTask}
              id="createTaskInput"
              onChange={(event) => setNewTask(event.target.value)}
            />
            <Button
              variant="success"
              id="createTaskButton"
              disabled={isSubmittedDisabled}
              type="submit"
            >
              +
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
