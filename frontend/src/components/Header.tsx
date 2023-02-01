import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InputGroup } from 'react-bootstrap';

function Header() {

    // function handleAddTask() {

    // }

  return (
    <div>
        <Container>
        <Row>
          <Col xs={2}><button className="btn btn-primary btn-sm">Delete</button></Col>
          <Col xs={2}><button className="btn btn-primary btn-sm">Status</button></Col>
          <Col xs={1}><label className="form-check-label" >P</label></Col>
          <Col xs={2}>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            </div>
          </Col>
          <Col xs={1}><label className="form-check-label">C</label></Col>
          <Col xs={4}>
          <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Task" id="inputDefault" />
          <button className="btn btn-primary" type="button" id="button-addon2">+</button>
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Header