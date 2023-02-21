import React, { useState, useEffect } from "react";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/Header";
import axios from "axios";
import { TaskRenderer } from "./components/TaskRenderer";

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export async function getTasks(): Promise<ITask[]> {
  let response = await axios.get("tasks/");
  return response.data.tasks;
}

function App() {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [showPending, setShowPending] = useState<boolean>(true);

  useEffect(() => {
    const getResponse = async () => {
      let response = await getTasks();
      setAllTasks(response);
    };
    getResponse();
  }, []);

  return (
    <Container className="App">
      <Row>
        <Header
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          showPending={showPending}
          setShowPending={setShowPending}
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
        />
      </Row>
      <Row>
        <Col xs={1}></Col>
        {showPending ? (
          <Col xs={10} className="listHolder" id="pending">
            <h5 className="listHeader"> Pending </h5>

            <TaskRenderer
              completed={false}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
          </Col>
        ) : null}
        <Col xs={1}></Col>
      </Row>
      <Row>
        <Col xs={1}></Col>
        {showCompleted ? (
          <Col xs={10} id="CompletedList" className="listHolder">
            <h5 className="listHeader"> Completed </h5>

            <TaskRenderer
              completed={true}
              allTasks={allTasks}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
              setAllTasks={setAllTasks}
            />
          </Col>
        ) : null}
        <Col xs={1}></Col>
      </Row>
    </Container>
  );
}

export default App;
