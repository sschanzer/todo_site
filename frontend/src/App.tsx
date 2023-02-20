import React, { useState, ChangeEvent, useEffect } from "react";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup } from "react-bootstrap";
import Header from "./components/Header";
import axios from "axios";
import { Task } from "./components/Task";
import { TaskRenderer } from "./components/TaskRenderer";

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export async function getTasks(): Promise<ITask[]> {
  let response = await axios.get("all_tasks/");
  return response.data.tasks;
}

function App() {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const getResponse = async () => {
      let response = await getTasks();
      setAllTasks(response);
    };
    getResponse();
  }, []);

  return (
    <Container className="App">
      <Header allTasks={allTasks} setAllTasks={setAllTasks} />
      <Row style={{ textAlign: "center" }}>
        <h3>Pending Tasks</h3>
        <TaskRenderer
          completed={false}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
        />
      </Row>

      <Row style={{ textAlign: "center" }}>
        <h3>Completed Tasks</h3>
        <TaskRenderer
          completed={true}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
        />
      </Row>
    </Container>
  );
}

export default App;
