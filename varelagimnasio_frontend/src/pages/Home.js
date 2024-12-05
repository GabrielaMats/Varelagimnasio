import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getAll } from "../services/api";

function Home() {
  const [clientes, setClientes] = useState(0);
  const [productos, setProductos] = useState(0);
  const [ventas, setVentas] = useState(0);
  const [usuarios, setUsuarios] = useState(0);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const clientesData = await getAll("/usuarios/");
        const productosData = await getAll("/productos/");
        const facturasData = await getAll("/facturas/");
        const usuariosData = await getAll("/usuarios/");

        setClientes(clientesData.length);
        setProductos(productosData.length); 
        setVentas(
          facturasData.reduce((total, factura) => total + parseFloat(factura.total), 0)
        ); 
        setUsuarios(usuariosData.length); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              <Card.Text className="fs-1 text-success">{clientes}</Card.Text>
              <Card.Text>registrados</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="shadow-sm text-center card-equal">
            <Card.Body>
              <Card.Title className="text-primary fs-4">Productos</Card.Title>
              <Card.Text className="fs-1 text-success">{productos}</Card.Text>
              <Card.Text>disponibles</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="shadow-sm text-center card-equal">
            <Card.Body>
              <Card.Title className="text-primary fs-4">Ventas de hoy</Card.Title>
              <Card.Text className="fs-1 text-danger">
                ${ventas.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="shadow-sm text-center card-equal">
            <Card.Body>
              <Card.Title className="text-primary fs-4">Usuarios</Card.Title>
              <Card.Text className="fs-1 text-info">{usuarios}</Card.Text>
              <Card.Text>administrador(es)</Card.Text>
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

