'use client';

import '@/app/styles/global.css';
import Head from 'next/head';
import { Col, Container, Row, Nav } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bem Vindo a Magos & Grimorios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container fluid className="background-container vh-100 d-flex align-items-center justify-content-center">
        <Row className="justify-content-center w-100">
          <Col md={6} className='zelda-menu'>
            <Row>
              <Col md={12}>
                <h1 className='display-2 fw-bold fontLogoBold text-center text-gold mb-4 zelda-title'>
                  Magos & Grimorios
                </h1>
                <h5 className='fs-3 fontLogoThin text-center mb-5 text-white'>
                  Seu sistema de RPG, agora na Web
                </h5>
                <Nav className="flex-column text-center fs-4">
                  <Nav.Link href="/login" className="zelda-nav-link">
                    Login
                  </Nav.Link>
                  <Nav.Link href="/register" className="zelda-nav-link">
                    Cadastrar
                  </Nav.Link>
                  <Nav.Link eventKey="link-1" className="zelda-nav-link">
                    Contato
                  </Nav.Link>
                  <Nav.Link eventKey="link-2" className="zelda-nav-link">
                    Sobre
                  </Nav.Link>
                  <Nav.Link eventKey="disabled" disabled className="zelda-nav-link">
                    Em Breve
                  </Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}