"use client";

import { useState } from "react";
import {
  Navbar,
  Container,
  Offcanvas,
  Row,
  Col,
  Card,
  ProgressBar,
} from "react-bootstrap";

import "@/app/styles/dashboard.css";

import Head from 'next/head';

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const campaign = {
    id: 1,
    title: "Sussurros do Dragão",
    description:
      "Prepare-se para uma jornada repleta de desafios, magia e glória!",
    progress: 75,
    image: "/images/background/loginBackground.jpg", // substitua pela imagem da campanha
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      {/* Navbar com offcanvas */}
      <Navbar expand={false} className="mt-3">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              alt="Logo"
              src="/images/logo/logo.svg"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            M&G
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Perfil
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Configurações
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Sair
                  </a>
                </li>
              </ul>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container fluid>
        <Row className="justify-content-center w-100 mt-4 p-3">
          <Col md={11}>
            <Row className="mb-3">
              <Col md={6}>
                <h3 className="display-5">Boa noite, João!</h3>
                <p className="text-muted">
                  Vamos verificar algumas informações
                </p>
              </Col>
              <Col md={2} className="text-center">
                <p className="text-muted">Players</p>
                <h6 className="fontLine">238</h6>
              </Col>
              <Col md={2} className="text-center">
                <p className="text-muted">Fichas</p>
                <h6 className="fontLine">348</h6>
              </Col>
              <Col md={2} className="text-center">
                <p className="text-muted">Campanhas</p>
                <h6 className="fontLine">3</h6>
              </Col>
            </Row>
            <Row className="mb-3 text-center"></Row>
            <Row className="mb-5">
              <Col md={5} className="p-4 rounded shadow ">
                <h6>Campanhas Ativas</h6>
                <Card
                  className="text-dark border-0 shadow"
                  style={{ borderRadius: "10px" }}
                >
                  <Card.Img
                    src={campaign.image}
                    alt={campaign.title}
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      filter: "opacity(40%)",
                    }}
                  />
                  <Card.ImgOverlay
                    className="d-flex flex-column justify-content-end text-white"
                    style={{ borderRadius: "10px" }}
                  >
                    <Card.Title className="display-6">
                      {campaign.title}
                    </Card.Title>
                    <Card.Text className="mb-2">
                      {campaign.description}
                    </Card.Text>
                    <div className="mt-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Progresso da campanha:</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <ProgressBar
                        animated
                        variant="success"
                        now={campaign.progress}
                      />
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Col>
              <Col md={6} className="mt-5">
                <Row className="mb-5">
                  <Col md={6}>
                    <div className="folder-card mx-auto">
                    <a href="/ficha">
                      <div className="folder-tab"></div>
                      <h5 className="mt-5">Fichas</h5>
                      </a>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="folder-card mx-auto">
                      <div className="folder-tab"></div>
                      <h5 className="mt-5">Campanhas</h5>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="folder-card mx-auto">
                      <div className="folder-tab"></div>
                      <h5 className="mt-5">Perfil</h5>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="folder-card mx-auto">
                      <div className="folder-tab"></div>
                      <h5 className="mt-5">Sobre</h5>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
