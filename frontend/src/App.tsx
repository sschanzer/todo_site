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
import { CSRFToken } from "./components/CSRFToken";

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

  CSRFToken();

  return (
    <div className="App">
      <Header allTasks={allTasks} setAllTasks={setAllTasks} />
      <Row style={{ textAlign: "center" }}>
        <h3>Pending Tasks</h3>
        {allTasks.map((task) =>
          task.completed == false ? <Task task={task} /> : null
        )}
      </Row>

      <Row style={{ textAlign: "center" }}>
        <h3>Completed Tasks</h3>
        {allTasks.map((task) =>
          task.completed == false ? <Task task={task} /> : null
        )}
      </Row>
    </div>
  );
}

export default App;
