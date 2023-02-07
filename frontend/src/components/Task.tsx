import React from "react";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface IdProps {
  task: ITask;
}

export const Task: React.FC<IdProps> = ({ task }) => {
  return (
    <div className="task">
      <Row>
        <Col
          xs={8}
          id={`task${task.id}`}
          className="taskTitle"
          style={{ display: "flex" }}
        >
          <p>{task.title}</p>
        </Col>
        <Col xs={4} style={{ display: "flex" }}>
          <Form.Check type="checkbox" label="select" />
        </Col>
      </Row>
    </div>
  );
};
