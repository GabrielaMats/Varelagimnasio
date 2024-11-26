import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Home() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <h1 className="text-center">¡Bienvenido a VarelaGimnasio!</h1>
          <p className="text-center">
            Administra usuarios, membresías, transacciones y productos de tu gimnasio de manera eficiente.
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6} lg={3}>
          <Card>
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestiona la lista de usuarios registrados en el gimnasio.</Card.Text>
              <a href="/usuarios" className="btn btn-primary">Ir a Usuarios</a>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card>
            <Card.Body>
              <Card.Title>Membresías</Card.Title>
              <Card.Text>Controla los tipos y duración de las membresías activas.</Card.Text>
              <a href="/membresias" className="btn btn-primary">Ir a Membresías</a>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card>
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <Card.Text>Administra los productos disponibles para venta o uso.</Card.Text>
              <a href="/productos" className="btn btn-primary">Ir a Productos</a>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card>
            <Card.Body>
              <Card.Title>Transacciones</Card.Title>
              <Card.Text>Registra y consulta las transacciones realizadas.</Card.Text>
              <a href="/transacciones" className="btn btn-primary">Ir a Transacciones</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;


