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

export interface responseTasks {
  completed: ITask[];
  pending: ITask[];
}

export async function getTasks(): Promise<responseTasks> {
  let response = await axios.get("all_tasks");
  return response.data;
}

function App() {
  const [selectedTask, setSelectedTask] = useState<number[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [pendingTasks, setPendingTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const getResponseFromGetTasks = async () => {
      let response = await getTasks();
      setCompletedTasks(response.completed);
      setPendingTasks(response.pending);
    };
    getResponseFromGetTasks();
  }, []);

  CSRFToken();

  return (
    <div className="App">
      <Header pendingTasks={pendingTasks} setPendingTasks={setPendingTasks} />
      <Row style={{ textAlign: "center" }}>
        <h3>Pending Tasks</h3>
        {pendingTasks.map((task) => (
          <Task
            task={task}
            selected={selectedTask}
            setSelected={setSelectedTask}
          />
        ))}
      </Row>

      <Row style={{ textAlign: "center" }}>
        <h3>Completed Tasks</h3>
        {completedTasks.map((task) => (
          <Task
            task={task}
            selected={selectedTask}
            setSelected={setSelectedTask}
          />
        ))}
      </Row>
    </div>
  );
}

export default App;
