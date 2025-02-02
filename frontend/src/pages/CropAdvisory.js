import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const CropAdvisory = () => {
  return (
    <Container className="mt-5">
      <Row className="text-center mb-5">
        <Col>
          <h1>Crop Advisory</h1>
          <p className="lead">AI-powered advice for better crop management.</p>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Planting Schedule</Card.Title>
              <Card.Text>Best time to plant: Next week</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Pest Control</Card.Title>
              <Card.Text>Recommended pesticide: XYZ</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CropAdvisory;