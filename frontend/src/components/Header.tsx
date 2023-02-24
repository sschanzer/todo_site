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
import update from "../assets/update.png";
import trash from "../assets/trash.png";
import plus from "../assets/plus.png";

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

export const deleteTasks = async (taskIds: number[]) => {
  let response = await axios.delete("tasks/", {
    data: { selected: taskIds },
  });
  return response.data.success;
};

export const changeSelectedTasks = async (taskIds: number[]) => {
  let response = await axios.put("tasks/", { selected: taskIds });
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
    let response = await deleteTasks(selectedTasks);
    if (response) {
      selectedTasks.map((id) => {
        let selectedTask = document.getElementById(`taskMaster${id}`);
        if (selectedTask) {
          selectedTask.style.display = "none";
        }
      });
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
    <Container style={{ marginBottom: "1vh" }}>
      <Row
        style={{
          padding: "2vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={4} md={2} style={{ display: "flex" }}>
          <Button
            variant="lite"
            onClick={changingMultipleStatus}
            disabled={isChangeStatusDisabled()}
            id="changeStatusBtn"
            style={{
              height: "3vh",
              width: "2vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={update} style={{ height: "2vh", width: "2vw" }} />
          </Button>
          <Button
            variant="lite"
            onClick={deleteMultipleTasks}
            disabled={isChangeStatusDisabled()}
            id="DeleteMultBtn"
            style={{
              height: "3vh",
              width: "2vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={trash} style={{ height: "2vh", width: "2vw" }} />
          </Button>
        </Col>
        <Col xs={4} md={2}>
          <Toggle
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            showPending={showPending}
            setShowPending={setShowPending}
          />
        </Col>
        <Col xs={4} md={2} className="formHolder">
          <Form
            style={{ position: "relative", display: "flex" }}
            onSubmit={(event) => createNewTask(newTask, event)}
          >
            <Form.Control
              value={newTask}
              id="createTaskInput"
              onChange={(event) => setNewTask(event.target.value)}
            />
            <Button
              variant="lite"
              id="createTaskButton"
              disabled={isSubmittedDisabled}
              type="submit"
              style={{
                height: "3vh",
                width: "2vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={plus} style={{ height: "2vh", width: "2vw" }} />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
