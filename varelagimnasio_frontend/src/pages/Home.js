import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Home() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Panel Administrativo</h1>
      <p className="text-center">
        Bienvenido al sistema de administración del gimnasio.
      </p>
      <Row>
        <Col md={6} lg={3}>
          <Card className="shadow-sm text-center card-equal">
            <Card.Body>
              <Card.Title className="text-primary fs-4">Clientes</Card.Title>
              <Card.Text className="fs-1 text-success">0</Card.Text>
              <Card.Text>registrados</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="shadow-sm text-center card-equal">
            <Card.Body>
              <Card.Title className="text-primary fs-4">Productos</Card.Title>
              <Card.Text className="fs-1 text-success">0</Card.Text>
              <Card.Text>disponibles</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="shadow-sm text-center card-equal">
            <Card.Body>
              <Card.Title className="text-primary fs-4">Ventas de hoy</Card.Title>
              <Card.Text className="fs-1 text-danger">$0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="shadow-sm text-center card-equal">
            <Card.Body>
              <Card.Title className="text-primary fs-4">Usuarios</Card.Title>
              <Card.Text className="fs-1 text-info">1</Card.Text>
              <Card.Text>administrador</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center text-primary">
                Actividad Reciente
              </Card.Title>
              <Card.Text className="text-center text-muted">
                No hay datos recientes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
